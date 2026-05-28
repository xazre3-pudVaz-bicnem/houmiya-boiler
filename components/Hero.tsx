import Image from 'next/image'

export default function Hero() {
  return (
    <section
      className="w-full"
      style={{ background: '#eef8ff', paddingTop: '72px' }}
    >
      <Image
        src="/hero-banner.png"
        alt="横浜市・川崎市・厚木市・海老名市対応 給湯器交換なら宝宮設備 365日24時間即日対応"
        width={1717}
        height={916}
        priority
        className="w-full h-auto block"
      />
    </section>
  )
}
