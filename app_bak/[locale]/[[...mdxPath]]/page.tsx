import type { Metadata } from 'next'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath', 'locale')

export async function generateMetadata({
  params
}: {
  params: { mdxPath?: string[]; locale: string }
}): Promise<Metadata> {
  const { metadata } = await importPage(params.mdxPath, params.locale)
  return metadata as Metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function Page({
  params
}: {
  params: { mdxPath?: string[]; locale: string }
}) {
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(
    params.mdxPath,
    params.locale
  )

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent />
    </Wrapper>
  )
}
