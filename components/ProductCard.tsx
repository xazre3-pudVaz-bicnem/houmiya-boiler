import Link from 'next/link'
import Image from 'next/image'
import { ProductItem, formatPrice } from '@/data/products'
import { getCapacityLabel } from '@/lib/productUtils'
import { siteConfig } from '@/data/site'

type Props = {
  product: ProductItem
  showDetail?: boolean
}

export default function ProductCard({ product, showDetail = true }: Props) {
  const {
    makerLabel,
    series,
    model,
    remoteModel,
    typeLabel,
    capacity,
    installationLabel,
    listPrice,
    discountRate,
    salePrice,
    remoteSalePrice,
    constructionFee,
    totalExTax,
    totalInTax,
    warranty,
    image,
    detailUrl,
    popular,
    recommended,
    priceStatus,
  } = product

  const isConfirmed = priceStatus !== 'needs_confirmation'

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* バッジ */}
      <div className="relative">
        {(popular || recommended) && (
          <div className="absolute top-2 left-2 z-10">
            {recommended ? (
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded">おすすめ</span>
            ) : (
              <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-2 py-1 rounded">人気</span>
            )}
          </div>
        )}
        {/* 割引バッジ */}
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-red-600 text-white rounded-full w-12 h-12 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold leading-none">最大</span>
            <span className="text-base font-black leading-none">{discountRate}%</span>
            <span className="text-[9px] font-bold leading-none">OFF</span>
          </div>
        </div>
        <div className="bg-gray-50 aspect-[4/3] flex items-center justify-center overflow-hidden">
          <Image
            src={image}
            alt={`${makerLabel} ${model} ${typeLabel} ${capacity}号`}
            width={300}
            height={225}
            className="w-full h-full object-contain p-4"
          />
        </div>
      </div>

      {/* 商品情報 */}
      <div className="p-4 flex flex-col flex-1">
        {/* メーカー・シリーズ */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-brand-700 bg-blue-50 px-2 py-0.5 rounded">{makerLabel}</span>
          <span className="text-xs text-gray-500">{series}</span>
        </div>
        {/* 型番・スペック */}
        <div className="mb-3">
          <div className="font-black text-gray-900 text-sm leading-tight">{model}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {capacity}号 / {typeLabel} / {installationLabel}
          </div>
          <div className="mt-1">
            <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded px-2 py-0.5">
              {getCapacityLabel(capacity)}
            </span>
          </div>
        </div>

        {priceStatus === 'needs_confirmation' ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 mb-3">
            <div className="text-gray-400 text-xs mb-1">価格確認中</div>
            <div className="text-brand-700 font-black text-lg">要見積もり</div>
            <div className="text-gray-400 text-xs mt-1">写真送付で即日回答</div>
          </div>
        ) : (
          <div className="flex-1">
            {/* 価格内訳 */}
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 mb-3 text-sm">
              {/* 定価 */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">メーカー希望小売価格</span>
                <span className="text-gray-400 line-through text-xs">{formatPrice(listPrice)}円</span>
              </div>
              {/* 割引 */}
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-bold text-xs">{discountRate}%OFF</span>
                <span className="text-red-600 font-black text-base">{formatPrice(salePrice)}円</span>
              </div>
              <div className="border-t border-gray-200 my-1" />
              {/* リモコン */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">リモコン（{remoteModel}）</span>
                <span className="text-gray-700 font-bold">{formatPrice(remoteSalePrice)}円</span>
              </div>
              {/* 工事費 */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">標準取付費（処分費込）</span>
                <span className="text-gray-700 font-bold">{formatPrice(constructionFee)}円</span>
              </div>
              <div className="border-t border-gray-200 my-1" />
              {/* 合計 */}
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>税抜合計</span>
                  <span>{formatPrice(totalExTax)}円</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-gray-700">工事費込み税込価格</span>
                  <span className="text-red-600 font-black text-xl">
                    {formatPrice(totalInTax)}円
                  </span>
                </div>
              </div>
            </div>
            {/* すべて税抜表示注記 */}
            <div className="text-[10px] text-gray-400 mb-2">
              ※本体・リモコン・工事費は税抜表示。合計は税込。
            </div>
          </div>
        )}

        {/* 保証 */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <svg className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
          </svg>
          {siteConfig.warrantyLabel}
        </div>

        {/* CTA ボタン */}
        <div className="grid grid-cols-2 gap-2">
          {showDetail && (
            <Link
              href={detailUrl}
              className="flex items-center justify-center text-xs font-bold text-brand-700 border border-brand-300 rounded py-2 hover:bg-blue-50 transition-colors"
            >
              詳細を見る
            </Link>
          )}
          <Link
            href="/estimate"
            className={`flex items-center justify-center text-xs font-black text-white bg-red-600 hover:bg-red-700 rounded py-2 transition-colors ${showDetail ? '' : 'col-span-2'}`}
          >
            無料見積もり
          </Link>
        </div>
      </div>
    </div>
  )
}
