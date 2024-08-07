'use server'

import axios from 'axios'
import { sha256 } from 'js-sha256'
import UAParser from 'ua-parser-js'
import { headers } from 'next/headers'
import { cookies } from 'next/headers'

import { db } from '@/lib/db'

export const createLead = async ({
  phone,
  eventId,
}: {
  phone: string
  eventId?: string
}) => {
  try {
    const header = headers()

    if (!phone) {
      return {
        error: 'Invalid data',
      }
    }

    const parser = new UAParser('user-agent')
    const browser = header.get('user-agent')

    if (browser) {
      parser.setUA(browser)
    }

    const ip =
      process.env.NODE_ENV === 'development'
        ? null
        : header.get('x-real-ip') || header.get('x-forwarded-for')
    const address = !!ip
      ? await axios
          .get(`http://ipwhois.pro/${ip}?key=${process.env.IP_WHOIS_API_KEY}`)
          .then(response => response.data)
          .catch(() => null)
      : null

    const data = await db.lead.create({
      data: {
        ip,
        phone,
        city: address?.city,
        osName: parser.getOS().name,
        state: address?.region_code,
        country: address?.country_code,
        browserName: parser.getBrowser().name,
      },
    })

    const phoneUnmasked = phone.replace(/\D/g, '')
    const zipCode = address?.postal?.replace(/\D/g, '')

    const fbp = cookies().get('_fbp')?.value
    const fbc = cookies().get('_fbc')?.value

    await facebookPixel({
      eventId,
      user: {
        fbp,
        fbc,
        zipCode,
        id: data.id,
        ip: ip || undefined,
        phone: `55${phoneUnmasked}`,
        userAgent: browser || undefined,
        city: address?.city?.toLowerCase() || undefined,
        state: address?.region_code?.toLowerCase() || undefined,
        country: address?.country_code?.toLowerCase() || undefined,
      },
    }).catch(() => null)

    return {
      success: 'Cadastro realizado com sucesso',
    }
  } catch (error) {
    console.log(error)

    return {
      error: 'Ocorreu um erro ao realizar o cadastro. Tente novamente.',
    }
  }
}

export const facebookPixel = async ({
  user,
  eventId,
}: {
  eventId?: string
  user: {
    id: string
    ip?: string
    fbp?: string
    fbc?: string
    phone: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
    lastName?: string
    firstName?: string
    userAgent?: string
  }
}) => {
  try {
    const data = [
      {
        event_name: 'Lead',
        event_id: eventId,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: {
          fbp: user.fbp,
          fbc: user.fbc,
          ct: sha256(user.city || ''),
          ph: sha256(user.phone || ''),
          st: sha256(user.state || ''),
          zp: sha256(user.zipCode || ''),
          ln: sha256(user.lastName || ''),
          fn: sha256(user.firstName || ''),
          client_ip_address: user.ip,
          external_id: sha256(user.id || ''),
          country: sha256(user.country || ''),
          client_user_agent: user.userAgent,
        },
      },
    ]

    const apiVersion = 'v18.0'
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

    if (!accessToken || !pixelId) {
      return
    }

    await axios.post(
      `https://graph.facebook.com/${apiVersion}/${pixelId}/events`,
      {
        data: JSON.stringify(data),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          access_token: accessToken,
        },
      },
    )
  } catch (error) {
    console.log(error)
  }
}
