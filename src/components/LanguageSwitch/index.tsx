import React, { memo, useRef } from 'react'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { ApplicationModal } from '../../state/application/actions'
import Image from 'next/image'
import Link from 'next/link'
import { StyledMenu } from '../StyledMenu'
import getConfig from 'next/config'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useRouter } from 'next/router'

const { publicRuntimeConfig } = getConfig()
const { locales } = publicRuntimeConfig

// Use https://onlineunicodetools.com/convert-unicode-to-image to convert
// Unicode flags (https://emojipedia.org/flags/) to png as Windows does not support Unicode flags
// Use 24px as unicode characters font size
const LANGUAGES: {
  [x: string]: { flag: string; language: string; dialect?: string }
} = {
  en: {
    flag: '/images/flags/en-flag.png',
    language: 'English',
  },
  de: {
    flag: '/images/flags/de-flag.png',
    language: 'German',
  },
  it: {
    flag: '/images/flags/it-flag.png',
    language: 'Italian',
  },
  ru: {
    flag: '/images/flags/ru-flag.png',
    language: 'Russian',
  },
  ro: {
    flag: '/images/flags/ro-flag.png',
    language: 'Romanian',
  },
  vi: {
    flag: '/images/flags/vi-flag.png',
    language: 'Vietnamese',
  },
  'zh-CN': {
    flag: '/images/flags/ch-flag.png',
    language: 'Chinese',
    dialect: '简',
  },
  'zh-TW': {
    flag: '/images/flags/ch-flag.png',
    language: 'Chinese',
    dialect: '繁',
  },
  es: {
    flag: '/images/flags/es-flag.png',
    language: 'Spanish',
  },
  'es-AR': {
    flag: '/images/flags/es-flag.png',
    language: 'Spanish',
    dialect: 'AR',
  },
  ko: {
    flag: '/images/flags/ko-flag.png',
    language: 'Korean',
  },
  ja: {
    flag: '/images/flags/ja-flag.png',
    language: 'Japanese',
  },
  fr: {
    flag: '/images/flags/fr-flag.png',
    language: 'French',
  },
}

function LanguageSwitch() {
  const { locale, pathname } = useRouter()
  const node = useRef<HTMLDivElement>(null)
  const open = useModalOpen(ApplicationModal.LANGUAGE)
  const toggle = useToggleModal(ApplicationModal.LANGUAGE)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <StyledMenu ref={node}>
      <div
        className="cursor-pointer flex items-center justify-center rounded border border-transparent hover:border-black h-[40px] w-[40px]"
        onClick={toggle}
      >
        <Image src={LANGUAGES[locale].flag} alt={LANGUAGES[locale].language} width={22} height={22} />
      </div>
      {open && (
        <div className="min-w-[10rem] max-h-[232px] md:max-h-[unset] absolute flex flex-col z-50 md:top-[4.2rem] right-0 md:overflow-hidden overflow-scroll top-[-15.5rem] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          {locales.map((key) => {
            const { flag, language, dialect } = LANGUAGES[key]
            return (
              <Link href={pathname} locale={key} key={key}>
                <a className="cursor-pointer flex items-center px-3 py-1.5 hover:text-gray-400" onClick={toggle}>
                  <Image
                    className="inline w-3 h-3 mr-1 align-middle"
                    src={flag}
                    width={20}
                    height={20}
                    alt={language}
                  />
                  <span className="ml-4">{language}</span>
                  {dialect && (
                    <sup>
                      <small>{dialect}</small>
                    </sup>
                  )}
                </a>
              </Link>
            )
          })}
        </div>
      )}
    </StyledMenu>
  )
}

export default memo(LanguageSwitch)
