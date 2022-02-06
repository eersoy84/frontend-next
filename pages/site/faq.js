
import theme from '../../data/theme';
import Head from 'next/head'
import PageHeader from '../../components/shared/PageHeader';

function SitePageFaq() {
    const breadcrumb = [
        { title: 'Anasayfa', url: '' },
        { title: 'Sıkça Sorulan Sorular', url: '' },
    ];

    return (
        <>
            <Head>
                <title>{`Sıkça Sorulan Sorular — ${theme.name}`}</title>
                <meta name="description" content="Bizleal hakkında sıkça sorulan sorular" />
                <meta name="keywords" content="bizleal hakkında merak edilenler" />
            </Head>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="block faq">
                <div className="container">
                    <div className="faq__section">
                        <div className="faq__section-title">
                            <h3>Ortak Satın Alma</h3>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">

                                        <h6>Bizleal nasıl çalışır?</h6>
                                        <p className="siteInfo">
                                            bizleal.com, bir ortak satın alma platformudur. Üyeler, ortak ihtiyaçları doğrultusunda  satın alma yaparak çok uygun fiyatlardan satın alma yapabilirler.
                                        </p>
                                        <h6>Bizleal&quot;ın diğer e-ticaret sitelerinden ne farkı var?</h6>
                                        <p className="siteInfo">
                                            bizleal.com&quot;da ürün fiyatı üyelerin toplam satın alma adedine göre düşer. Üyeler, organize olarak hep birlikte toptan fiyatına satın alma yapabilirler.
                                        </p>
                                        <h6>Ödeme nasıl alınır?</h6>
                                        <p className="siteInfo">
                                            bizleal.com&quot;da herhangi bir ürün satın alınırken, her üye en başta ürünün belirlenen ilk satış fiyatını öder. İlan süresi dolduğunda, toplam talebe göre düşen
                                            fiyat farkı, hesabınıza iade edilir.
                                        </p>
                                        <h6>Neden en başta satış fiyatını ödemek zorundayım?</h6>
                                        <p className="siteInfo">
                                            Bizleal&quot;da ürünün son fiyatı toplam satın alma adedine göre değişir. Dolayısıyla, ilan ilk yayınlandığında ürünü satın alan üyelerimize adaletsizlik olmaması için, bütün üyelerimiz en başta ürünün ilk belirlenen satış fiyatını öder.
                                            İlan süresi sounda, en başta ödediğiniz ilk fiyattan, netleşen son fiyat farkı hesaplanıp kartınıza iade edilir.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">

                                        <h6>Kapora nedir?</h6>
                                        <p className="siteInfo">
                                            Bizleal&quot;da fiyatı yüksek olan bazı ürünlerde üyelerimizden en başta belli bir oranda kapora alınır. Daha sonra netleşen satın alma adedine ve ürün fiyatına göre, üyelerimizden
                                            kalan bakiye tahsil edilir. Ancak, ilan süresi sonunda yeterli siparişe ulaşılmazsa, bu kapora iade edilir.
                                        </p>
                                        <h6>Kaporam yanar mı?</h6>
                                        <p className="siteInfo">
                                            Bizleal&quot;da yatırdığınız kapora, ilan süresinin sonuna kadar her durumda iade edilir. Ancak, ilan süresi dolmuşsa ve ürünün geri kalan fiyatının ödemesini zamanında yapılmamışsa
                                            kaporanız irad kaydedilir, iade edilmez. Son satış fiyatını etkileyeceği için diğer üyeler arasında eşit olarak dağıtılır.
                                        </p>
                                        <h6>Kalan bakiye nedir?</h6>
                                        <p className="siteInfo">
                                            Bir ilanda yeterli sipariş sayısına ulaşıldığı durumda, ürün fiyatı kesinleşir ve ürünün kalan fiyatının ödemesinin yapılması beklenir.
                                            Aksi halde, kaporanız sisteme irad kaydedilir.
                                        </p>
                                        <h6>Fiyatlar neder düşük?</h6>
                                        <p className="siteInfo">
                                            Bizleal&quot;da toptancılar, ürünlerini, onlarca, yüzlerce müşteriye toptan fiyatına doğrudan satar. Dolayısla, herhangi bir aracı olmadığı çok daha indirimli fiyatlara satın alma gerçekleştirmek mümkündür.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq__section">
                        <div className="faq__section-title">
                            <h3>Ürün İade</h3>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6>Aldığım ürünü nasıl iade edebilirim?</h6>

                                        <p className="siteInfo">
                                            info@bizleal.com adresine, isim soyisim, ilan numarası ve size verilen
                                            sipariş numarasını içeren bir e-posta yollayarak kolayca iade talebi oluşturabilirsiniz.
                                        </p>

                                        <h6>İade politikanız nedir?</h6>

                                        <ol type="i" className="siteInfo">
                                            <li>
                                                İade süresi elinize ulaştığından itibaren 15 gündür.
                                            </li>
                                            <li>
                                                Ürünlerinizi ÜCRETSİZ iade edebilmek için iade kargo kodu almanız gerekir. İade kargo kodu almak için “İade işlemini nasıl yapabilirim?” sorusundaki adımları takip edin.
                                            </li>
                                            <li>
                                                Ürünlerinizi iade adımında gösterilen kargo firması ile iade edebilirsiniz.
                                            </li>
                                            <li>
                                                Tek kullanımlık ürünler ile hızlı bozulan veya son kullanma tarihi geçme ihtimali olan ürünlerin iadesi kabul edilmez.
                                            </li>
                                            <li>
                                                Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri, mayo, bikini, kitap, kopyalanabilir yazılım ve programlar, DVD, CD ve kasetler ile kırtasiye sarf malzemeleri (toner, kartuş, şerit vb.),
                                                <ol>
                                                    <li>
                                                        Ambalajı açılmamış
                                                    </li>
                                                    <li>
                                                        Denenmemiş
                                                    </li>
                                                    <li>
                                                        Bozulmamış
                                                    </li>
                                                    <li>
                                                        Kullanılmamış olmaları halinde iade edilebilir.
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                Ürünler kullanılmış, yıpranmış, yıkanmış bir şekilde bize ulaşırsa size geri göndermek zorunda kalabiliriz. Bu durumda ücret iadesi yapılmaz.
                                            </li>
                                            <li>
                                                Beyaz eşya (buzdolabı, bulaşık makinesi, çamaşır makinesi, fırınlar (gaz, elektrik, mikrodalga),
                                                set üstü ocaklar, aspiratörler, ütüler, vantilatör, ısıtıcılar, soğutucular), televizyon vb. kurulum gerektiren ürünler; yetkili servis bilgisi olmadan açılırsa iade kapsamı dışında kalır.
                                            </li>
                                            <li>
                                                Ürün yetkili servis çalışanları tarafından açıldıktan sonra üründe herhangi bir hasar/kusur/ayıp tespit edilmesi halinde yetkili servis çalışanlarına detaylı olarak sorunun not edildiği bir durum tespit tutanağı/servis formu/servis raporu doldurtmanız gerekir.
                                                Bu belgeyi aldıktan sonra ürünü iade etmek istemeniz halinde www.bizleal.com internet sitesi üzerinden iade kodu alarak ürünü kargo görevlisine teslim ederek ürünü iade edebilirsiniz.
                                            </li>

                                        </ol>
                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6>İade kargo masraflarını ben mi ödeyeceğim?</h6>
                                        <ul className="siteInfo">
                                            <li>
                                                Kargonuzu teslim ederken iade kargo kodunu belirtmeyi unutmayın.
                                            </li>
                                            Not: Kargo bedava kampanyasıyla oluşturulan siparişlerin iptal/iadesi olursa ve kalan tutar kampanya şartını sağlamıyorsa iade edilecek ürün bedelinden kargo ücreti düşülür.
                                        </ul>

                                        <h6>İade/iptal ettiğim ürünün ücret iadesi ne zaman yapılacak?</h6>
                                        <ul className="siteInfo">
                                            <li>
                                                İade edilen ürün süreci aşağıdaki gibidir:
                                                <ol>
                                                    <li>
                                                        Ürün bize ulaştıktan sonra iade şartlarına uygunluğu kontrol edilir.
                                                    </li>
                                                    <li>
                                                        Ürün iade şartlarına uygunsa 2-10 gün içerisinde iade süreci tamamlanır.
                                                    </li>
                                                    <li>
                                                        Ürün iade şartlarına uygun değilse adresinize geri gönderilir.
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                İadeniz tamamlanınca üyelik e-mailinize bir bilgilendirme mesajı gönderilir.
                                            </li>
                                            <li>
                                                &quot;Hesabım&quot; bölümünde yer alan &quot;Siparişlerim&quot; sekmesindeki referans numaranızla bankanızdan iade kontrolü yapabilirsiniz.
                                            </li>
                                            <li>
                                                İade edilen tutarın kartınıza yansıma süresi bankanıza bağlıdır. Kredi kartı ile ödeme yaptıysanız genelde bir kaç günde yansır. Banka kartlarında ise iadenin hesabınıza yansıma süresi daha uzundur.
                                            </li>
                                            <li>
                                                bizleal, taksitle yapılan alışverişlerin ücretini bankaya tek seferde öder. Banka, bu tutarı kredi kartınıza taksit sayısı kadar ayda iade eder. Örn: 3 taksitle aldıysanız 3 ayda iade tamamlanır.
                                            </li>

                                        </ul>

                                        <h6>15 günlük iade sürem doldu, ürünü iade edebilir miyim?</h6>
                                        <ul className="siteInfo">
                                            <li>
                                                Mesafeli Satış Sözleşmesine göre internetten veya mobilden satın alınan bir ürünü iade etme süresi 15 gündür.
                                            </li>
                                            <li>
                                                15 günlük süre ürünü kargodan teslim aldığınız gün başlar.
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq__section">
                        <div className="faq__section-title">
                            <h3>Ödeme</h3>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6>Kapıda ödeme var mı?</h6>
                                        <p className="siteInfo">
                                            Ödemelerinizi sadece kredi kartı ve banka kartı ile sipariş oluşturma aşamasında yapabilirsiniz.
                                        </p>
                                        <h6>Kredi kartına taksit var mı?</h6>
                                        <p className="siteInfo">
                                            Taksit seçeneği ürün ve ilanin türüne göre farklılık göstermektedir. Her ilanda mevcut değildir.
                                        </p>
                                        <h6>Kredi kartımı nasıl kaydederim?</h6>
                                        <p className="siteInfo">
                                            Ödeme aşamasından hemen sonra kredi kartı bilgilerinizi güvenle kaydedebilir ve sonraki siparişlerinizi çok daha hızlı tamamlayabilirsiniz.
                                        </p>

                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6>Kredi kartımla alışveriş yaparken güvende miyim?</h6>
                                        <ul className="siteInfo">
                                            <p>
                                                Evet kesinlikle güvendesiniz,
                                            </p>
                                            <li>bizleal’da en yüksek güvenlik sistemi olan yeşil bar uygulaması bulunmaktadır, 128 bit şifreleme ile iletilen bilgilerin güvenliğini sağlayan SSL Sertifikası kullanılır.</li>
                                            <li>bizleal’da&quot;da alışveriş yapılırken kullanılan kart bilgileri sizin onayınız olmaz ise kaydedilmez ve kesinlikle üçüncü kişiler tarafından görülemez.</li>
                                            <li>Banka kartı ile yaptığınız işlemlerde 3D Secure sistemi kullanılır. 3D Secure, online alışverişlerin güvenliğini sağlamak amacıyla kart kuruluşları tarafından geliştirilmiş bir kimlik doğrulama sistemidir.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq__section">
                        <div className="faq__section-title">
                            <h3>Siparişler</h3>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">

                                        <h6>Siparişim ne zaman gelir?</h6>

                                        <p className="siteInfo">
                                            bizleal.com bir ortak satın alma platformu olduğundan diğer e-ticaret siteleri ile karıştırılmamalıdır.
                                            Bu platformda bir ürünün satın almasının gerçekleşmesi için yeterli sipariş sayısına ulaşılması gerekmektedir.
                                            Sipariş edilen ürün, ilan tarihinin sonlanmasını takiben ödemenin gerçekleşmesi durumuna göre 5 iş günü içersinde kargoya verilir.

                                        </p>
                                        <h6>Kargodaki siparişimi iptal etmek istiyorum.</h6>

                                        <ul className="siteInfo">
                                            <li>Ana sayfada yer alan &quot;Hesabım&quot; bölümünde bulunan &quot;Siparişlerim&quot; sekmesinden siparişinizin durumunu kontrol edin.</li>
                                            <li>Eğer siparişiniz “Kargoya Verildi” statüsünde ise iptal edilemez.</li>
                                            <li>Kargoyu teslim almadan iade edebilirsiniz.</li>
                                        </ul>
                                        <h6>Aldığım ürünlerin fiyatlarına kdv dahil midir?</h6>

                                        <p className="siteInfo">
                                            bizleal üzerinden satılan her ürünün satış fiyatına KDV dahildir.
                                        </p>

                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">

                                        <h6>Siparişim eksik gönderilmiş</h6>

                                        <ul className="siteInfo">
                                            <li>Siparişinizi her zaman kargo görevlisinin yanında açın.</li>
                                            Kargo paketinin içeriği eksik veya hatalı ise:
                                            <ol>

                                                <li>Kargoyu kesinlikle teslim almayın.</li>
                                                <li>Kargo görevlisine “Hasar Tespit Tutanağı” tutturun.</li>
                                                <li>Ürünü/kutuyu bu tutanak ve fatura ile birlikte trendyol’a geri gönderin.</li>
                                                <li>Durumla ilgili e-posta ya da çağrı merkezlerimizden bizimle irtibata geçin.</li>
                                            </ol>
                                            <li>
                                                {' '}
                                                Ürünü kargo görevlisinin yanında açmadıysanız durumun detaylı açıklamasını ve birkaç fotoğraf ile birlikte
                                                talebinizi e-posta ya da çağrı merkezlerimiz üzerinden bize iletin.
                                                Müşteri Danışmanlarımız talebinizi inceleyecek ve en kısa sürede dönüş yapacaktır.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SitePageFaq;
