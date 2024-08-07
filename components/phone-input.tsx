'use client'

import 'react-international-phone/style.css'

import { PhoneInput as PhoneInputComponent } from 'react-international-phone'

interface PhoneInputProps {
  value?: string
  isDisabled?: boolean
  onChange: (value: string) => void
}

export const PhoneInput = ({
  value,
  onChange,
  isDisabled,
}: PhoneInputProps) => {
  return (
    <PhoneInputComponent
      autoFocus
      value={value}
      forceDialCode
      onChange={onChange}
      defaultCountry="br"
      disabled={isDisabled}
      preferredCountries={['br', 'us']}
      countrySelectorStyleProps={{
        buttonStyle: {
          height: '2.5rem',
          width: '3.75rem',
        },
      }}
      inputStyle={{
        width: '100%',
        height: '2.5rem',
      }}
      style={{
        width: '100%',
      }}
    />
  )
}
