'use client'

import Image from 'next/image'
import { nanoid } from 'nanoid'
import { Suspense } from 'react'
import { Sora } from 'next/font/google'

import logoyt from './assets/logo-yt.png'
import celular from './assets/CELULAR.png'
import VideoPlayer from '@/components/video'
import fotoThiago from './assets/img-thiago.png'
import carousel from './assets/carousel-aulas.png'
import bannerMain2 from './assets/banner-part-2.png'
import fundoCelular from './assets/fundo-celular.png'
import bannerMain from './assets/banner-part-1-yt.png'
import { FacebookPixel } from '@/components/facebook-pixel'
import { CreateLeadModal } from '@/features/leads/components/create-lead-modal'
import { useOpenCreateLeadModal } from '@/features/leads/hooks/use-open-create-lead-modal'

const sora = Sora({
  subsets: ['latin'],
  weight: '400', // Especifica o peso da fonte
})

const targetDate = new Date('2024-08-16')
const datenow = new Date()
// Calcule a diferença em milissegundos
const differenceInTime = targetDate.getTime() - datenow.getTime()

// Converta a diferença de milissegundos para dias
const days = Math.round(differenceInTime / (1000 * 3600 * 24))

export default function Home() {
  const { onOpen: openCreateSpotLead } = useOpenCreateLeadModal()

  const userIdentifier = nanoid()

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-between bg-[#0d0d0d] text-white ${sora.className}`}
      >
        <section
          className="flex min-h-[500px] w-full flex-wrap bg-cover bg-center p-12 pb-[40px]"
          style={{ backgroundImage: `url(${bannerMain.src})` }}
        >
          <div className="flex w-[50%] flex-col justify-center gap-4 pl-[15%] max-sm:w-full max-sm:pl-7">
            <Image
              priority
              alt="logo"
              src={logoyt}
              quality={100}
              draggable={false}
              className="h-[110px] w-[160px]"
            />

            <h1 className="text-[3rem] max-lg:text-[2rem]">
              Vale a pena{' '}
              <span className="text-cyan-400">larga seu emprego </span> para
              <br />
              <span className="bg-red-600 p-1 font-bold text-white">
                SER YOUTUBER?
              </span>
            </h1>

            <p className="text-[1rem] text-gray-300 min-[1200px]:w-[90%]">
              Um curso completo para você começar do zero e se tornar um
              Youtuber de sucesso!
            </p>

            <button
              className="max-w-fit rounded-md bg-cyan-400 p-2 text-2xl font-black text-white"
              onClick={() => {
                openCreateSpotLead({
                  eventId: userIdentifier,
                  whatsappGroup:
                    'https://chat.whatsapp.com/IpuYar3Q9jhCAC9bhRyepE',
                })
              }}
            >
              quero aprender
            </button>
          </div>

          <div className="flex w-[50%] items-end max-sm:hidden">
            <div className="w-full">
              <Image
                priority
                quality={100}
                src={fotoThiago}
                draggable={false}
                className="w-full"
                alt="foto do thiago"
              />
            </div>
          </div>

          <div className="mb-10 mt-16 flex sm:hidden">
            <Image
              quality={100}
              src={fotoThiago}
              draggable={false}
              alt="foto do thiago"
              className="w-full scale-125 transform"
            />
          </div>
        </section>

        <section
          className="flex min-h-[500px] w-full bg-cover bg-center pb-[40px] pt-5 max-sm:bg-left"
          style={{ backgroundImage: `url(${bannerMain2.src})` }}
        >
          <div className="flex w-full flex-col items-center gap-4">
            <h2 className="pt-16 text-center text-[3rem] max-sm:text-[2rem]">
              Um curso para <br />{' '}
              <span className="font-bold">você aprender do zero! </span>
            </h2>

            <div className="p-4">
              <VideoPlayer src="https://matratecnologia.s3.amazonaws.com/landing-page-thiago-reis.mp4" />
            </div>

            <button
              className="max-w-fit rounded-md bg-cyan-400 p-2 text-2xl font-black text-white"
              onClick={() => {
                openCreateSpotLead({
                  eventId: userIdentifier,
                  whatsappGroup:
                    'https://chat.whatsapp.com/IpuYar3Q9jhCAC9bhRyepE',
                })
              }}
            >
              entrar para o grupo
            </button>
          </div>
        </section>

        <section className="flex min-h-[500px] w-full pb-[150px] pt-5">
          <div className="flex w-full flex-col items-center gap-[60px]">
            <h2 className="pt-16 text-center text-[3rem] max-sm:text-[2rem]">
              O que você <br />{' '}
              <span className="font-bold">vai aprender? </span>
            </h2>

            <Image
              priority
              quality={100}
              src={carousel}
              draggable={false}
              alt="carrousel-aulas"
              className="w-full bg-cover"
            />

            <button
              className="max-w-fit rounded-md bg-cyan-400 p-2 text-2xl font-black text-white"
              onClick={() => {
                openCreateSpotLead({
                  eventId: userIdentifier,
                  whatsappGroup:
                    'https://chat.whatsapp.com/IpuYar3Q9jhCAC9bhRyepE',
                })
              }}
            >
              entrar para o grupo
            </button>
          </div>
        </section>

        <section className="flex min-h-[500px] w-full flex-wrap items-center justify-center pt-5 min-[1000px]:pb-[150px]">
          <div className="flex w-[50%] flex-col justify-center gap-4 pl-40 max-lg:w-full max-lg:p-8">
            <Image
              priority
              alt="logo"
              src={logoyt}
              quality={100}
              draggable={false}
              className="h-[110px] w-[160px]"
            />

            <h2 className="text-[3rem] max-sm:text-[2rem]">
              <span className="text-cyan-400">
                Ficou Interessado? <br />
              </span>
              Entre no{' '}
              <span className="p-1 font-bold text-white">grupo VIP</span> para
              garantir sua vaga em primeira mão
            </h2>

            <button
              className="max-w-fit rounded-md bg-cyan-400 p-2 text-2xl font-black text-white"
              onClick={() => {
                openCreateSpotLead({
                  eventId: userIdentifier,
                  whatsappGroup:
                    'https://chat.whatsapp.com/IpuYar3Q9jhCAC9bhRyepE',
                })
              }}
            >
              entrar para o grupo
            </button>
          </div>

          <div
            className="flex justify-end bg-cover bg-right max-lg:w-full"
            style={{ backgroundImage: `url(${fundoCelular.src})` }}
          >
            <Image
              priority
              quality={100}
              alt="celular"
              src={celular}
              draggable={false}
              className="max-h-[500px] w-[350px] max-sm:w-[250px]"
            />
          </div>
        </section>

        <section className="pb-[40px]pt-5 flex min-h-[500px] w-full justify-center bg-cyan-400 p-24 text-black max-sm:p-10">
          <div className="flex h-fit flex-row gap-[50px] rounded-3xl border border-black p-24 max-lg:flex-col max-sm:p-6">
            <div className="flex w-[50%] items-center justify-center p-1 max-lg:w-full">
              <h2 className="text-[3rem] font-black max-sm:text-[2rem]">
                Faltam poucos dias para{' '}
                <span className="bg-red-600 p-1 font-bold">
                  abrirem as vagas
                </span>
              </h2>
            </div>
            <div className="flex w-[50%] items-center justify-center gap-5 p-1 max-lg:w-full max-sm:h-fit">
              <div className="flex items-center justify-center rounded-md bg-white p-11 max-sm:h-auto max-sm:w-auto max-sm:p-[15px]">
                <h2 className="text-[80px] font-black max-lg:text-[60px] max-sm:text-[55px]">
                  {days}
                </h2>
              </div>
              <h2 className="p-6 text-[80px] font-black max-lg:text-[60px] max-sm:h-auto max-sm:text-[55px]">
                :
              </h2>
              <div className="flex items-center justify-center rounded-md bg-white p-11 max-sm:h-auto max-sm:w-auto max-sm:p-[15px]">
                <h2 className="text-[80px] font-black max-lg:text-[60px] max-sm:text-[55px]">
                  D
                </h2>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CreateLeadModal />

      {process.env.NODE_ENV === 'production' &&
        process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <>
            <Suspense fallback={null}>
              <FacebookPixel
                pixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID!}
              />
            </Suspense>
          </>
        )}
    </>
  )
}
