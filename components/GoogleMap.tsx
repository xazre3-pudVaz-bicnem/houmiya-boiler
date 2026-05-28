export default function GoogleMap() {
  return (
    <section className="bg-slate-50 py-14 md:py-20" id="map">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <div className="inline-block bg-brand-800 text-sky text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            アクセス
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-brand-800">
            所在地・アクセス
          </h2>
          <span className="block w-12 h-1 bg-sky rounded-full mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Map */}
          <div className="md:col-span-3 rounded-lg overflow-hidden shadow-card border border-slate-200">
            <iframe
              src="https://maps.google.com/maps?q=神奈川県厚木市温水西1-4-39&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="株式会社宝宮設備 所在地"
            />
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-5 md:p-6 shadow-card">
              <div className="text-sky text-2xl mb-3">📍</div>
              <h3 className="font-black text-brand-800 text-lg mb-3">株式会社宝宮設備</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex gap-2.5">
                  <span className="text-gray-400 flex-shrink-0 w-14">住所</span>
                  <span className="text-brand-700">〒243-0032<br />神奈川県厚木市温水西1-4-39</span>
                </div>
                <div className="flex gap-2.5">
                  <span className="text-gray-400 flex-shrink-0 w-14">TEL</span>
                  <a href="tel:046-205-4558" className="text-sky-dark font-bold hover:underline">046-205-4558</a>
                </div>
                <div className="flex gap-2.5">
                  <span className="text-gray-400 flex-shrink-0 w-14">営業</span>
                  <span className="text-brand-700">9:00〜18:00（年中無休）</span>
                </div>
                <div className="flex gap-2.5">
                  <span className="text-gray-400 flex-shrink-0 w-14">エリア</span>
                  <span className="text-brand-700">横浜市・川崎市・厚木市・海老名市</span>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=神奈川県厚木市温水西1-4-39"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-brand-800 hover:bg-brand-700 text-white font-bold py-3.5 px-5 rounded-xl transition-all w-full shadow-card"
            >
              Google マップで見る
            </a>

            <div className="bg-[#e85d2a]/10 border border-[#e85d2a]/30 rounded-xl p-4">
              <p className="text-[#c0392b] font-bold text-sm mb-1">📞 最短即日対応</p>
              <p className="text-gray-600 text-xs leading-relaxed">
                お急ぎの場合はお電話ください。在庫・状況によっては当日中の工事も可能です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

