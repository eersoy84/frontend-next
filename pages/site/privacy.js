
// third-party

import Link from 'next/link'
import Head from 'next/head'

// application
import PageHeader from '../../components/shared/PageHeader';

// data stubs
import theme from '../../data/theme';;

function SitePagePrivacy() {
    const breadcrumb = [
        { title: 'Ana Sayfa', url: '' },
        { title: 'Gizlilik Politikası', url: '/site/gizlilik' },
    ];

    return (
        <>
            <Head>
                <title>{`Gizlilik Politikası — ${theme.name}`}</title>
                <meta name="description" content="Bizleal gizlilik politikası" />
                <meta name="keywords" content="bizleal gizlilik politikası" />
            </Head>

            <PageHeader breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="document">
                        <div className="document__header">
                            <h6 className="document__title">GİZLİLİK POLİTİKASI VE KİŞİSEL VERİLERİN KORUNMASI</h6>
                        </div>
                        <div className="document__content typography">
                            <p className="siteInfo">
                                {theme.company.name}
                                &quot;ye ( &quot;Bizleal &quot;) aktarılan kişisel verilerin korunması konusundaki temel bilgilere aşağıda yer verilmiştir.
                                Bizleal, 6698 sayılı Kişisel Verilerin Korunması Kanunu ( &quot;KVKK &quot;) m. 10&quot;dan doğan aydınlatma yükümlülüğünü yerine getirmek amacıyla aşağıdaki açıklamaları
                                müşterilerimizin ve web-sitemizi ve/veya mobil uygulamalarımızı kullanan 3. kişilerin dikkatine sunar.
                                Bizleal işbu Kişisel Verilerin Korunması Hakkında Açıklama metnini yürürlükteki mevzuatta yapılabilecek değişiklikler çerçevesinde her zaman güncelleme hakkını saklı tutar.
                            </p>

                            <ol>
                                <li>
                                    <strong>Bizleal kişisel verilerinizi hangi yasal dayanağa göre toplar?</strong>
                                    <p className="siteInfo">
                                        Müşterilerimizin kişisel verilerinin kullanılması konusunda çeşitli kanunlarda düzenlemeler bulunmaktadır.
                                        En başta KVKK ile kişisel verilerin korunması esasları belirlenmiştir.
                                        Ayrıca 6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun da kişisel verilerin korunmasına ilişkin hüküm içermektedir.
                                        5237 Sayılı Türk Ceza Kanunu hükümleri yoluyla da kişisel verilerin korunması için bazı hallerde cezai yaptırımlar öngörülmüştür.
                                        Diğer yandan, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği&quot;nden doğan yükümlülüklerimizin ifası amacıyla verilerin toplanması ve kullanılması gerekmektedir.
                                    </p>
                                </li>
                                <li>
                                    <strong>Bizleal kişisel verilerinizi toplarken hangi yöntemleri kullanır?</strong>
                                    <p className="siteInfo">
                                        www.bizleal.com web sitesinden veya mobil uygulamalardan işlem yapan müşterilerimizin girdikleri veriler,
                                        müşterilerimizin rızaları ve mevzuat hükümleri uyarınca Bizleal tarafından işlenmektedir.
                                        Bizleal&quot;a ait olan www.bizleal.com web sitesi çerez (cookie) kullanan bir sitedir.
                                        Çerez; kullanılmakta olan cihazın internet tarayıcısına ya da sabit diskine depolanarak söz konusu cihazın tespit edilmesine olanak tanıyan,
                                        çoğunlukla harf ve sayılardan oluşan bir dosyadır.
                                        www.bizleal.com ziyaretçilerine daha iyi hizmet verebilmek amacıyla ve yasal yükümlülüğü çerçevesinde,
                                        işbu Kişisel Verilerin Korunması Hakkında Açıklama metninde belirlenen amaçlar ve kapsam dışında kullanılmamak kaydı ile gezinme bilgilerinizi toplayacak,
                                        işleyecek, üçüncü kişilerle paylaşacak ve güvenli olarak saklayacaktır.
                                        www.bizleal.com çerezleri; günlük dosyaları, boş gif dosyaları ve/veya üçüncü taraf kaynakları yoluyla topladığı bilgileri
                                        tercihlerinizle ilgili bir özet oluşturmak amacıyla depolar. www.bizleal.com size özel tanıtım yapmak,
                                        promosyonlar ve pazarlama teklifleri sunmak, web sitesinin veya mobil uygulamanın içeriğini size göre iyileştirmek ve/veya tercihlerinizi belirlemek amacıyla;
                                        site üzerinde gezinme bilgilerinizi ve/veya site üzerindeki kullanım geçmişinizi izleyebilmektedir.
                                        www.bizleal.com çevrimiçi ve çevrimdışı olarak toplanan bilgiler gibi farklı yöntemlerle veya farklı zamanlarda site üzerinde sizden toplanan bilgileri eşleştirebilir
                                        ve bu bilgileri üçüncü taraflar gibi başka kaynaklardan alınan bilgilerle birlikte kullanabilir.
                                        www.bizleal.com mobil uygulamasında oturum çerezleri ve kalıcı çerezler kullanmaktadır.
                                        Oturum kimliği çerezi, tarayıcınızı kapattığınızda sona erer. Kalıcı çerez ise sabit diskinizde uzun bir süre kalır.
                                        İnternet tarayıcınızın  &quot;yardım &quot; dosyasında verilen talimatları izleyerek veya  &quot;www.allaboutcookies.org &quot; veya  &quot;www.youronlinechoices.eu &quot; adresini ziyaret ederek kalıcı çerezleri kaldırabilir
                                        ve hem oturum çerezlerini hem de kalıcı çerezleri reddedebilirsiniz.
                                        Kalıcı çerezleri veya oturum çerezlerini reddederseniz, web sitesini,
                                        mobil uygulamayı kullanmaya devam edebilirsiniz fakat web sitesinin, mobil uygulamanın tüm işlevlerine erişemeyebilirsiniz veya erişiminiz sınırlı olabilir.
                                    </p>
                                </li>
                                <li>
                                    <strong>Çerezler Nasıl Kullanılmaktadır?</strong>
                                    <p className="siteInfo">
                                        Bizleal&quot;a ait olan www.bizleal.com web sitesi çerez (cookie) kullanan bir sitedir. çerez; kullanılmakta olan cihazın internet tarayıcısına ya da sabit diskine depolanarak söz konusu cihazın tespit edilmesine olanak tanıyan, çoğunlukla harf ve sayılardan oluşan bir dosyadır.
                                        www.bizleal.com çerezleri; günlük dosyaları, boş gif dosyaları ve/veya üçüncü taraf kaynakları yoluyla topladığı bilgileri tercihlerinizle ilgili bir özet oluşturmak amacıyla depolar.
                                        Oturum çerezleri (session cookies) ve kalıcı çerezler (persistent cookies) olmak üzere sitelerimiz genelinde iki tür çerez kullanmaktayız. Oturum çerezleri geçici çerezler olup sadece tarayıcınızı kapatıncaya kadar geçerlidirler. Kalıcı çerezler siz silinceye veya süreleri doluncaya (bu şekilde çerezlerin cihazında ne kadar kalacağı, çerezlerin  &quot;kullanım ömürlerine &quot; bağlı olacaktır) kadar sabit diskinizde kalırlar.
                                        www.bizleal.com çerezleri; yaptığınız tercihleri hatırlamak ve web sitesi/mobil uygulama kullanımınızı kişiselleştirmek için kullanır. Bu kullanım parolanızı kaydeden ve web sitesi/mobil uygulama oturumunuzun sürekli açık kalmasını sağlayan, böylece her ziyaretinizde birden fazla kez parola girme zahmetinden kurtaran çerezleri ve web sitesi/mobil uygulamaya daha sonraki ziyaretlerinizde sizi hatırlayan ve tanıyan çerezleri içerir.
                                        www.bizleal.com web sitesine nereden bağlandığınız, web sitesi/mobil uygulama üzerinde hangi içeriği görüntülediğiniz ve ziyaretinizin süresi gibi web sitesini/mobil uygulamayı nasıl kullandığınızın ölçümlenmesi dahil olmak üzere web sitesini/mobil uygulamayı nasıl kullandığınızı tespit etmek için kullanır.
                                        www.bizleal.com web sitesi çerezleri ayrıca; arama motorlarını, web sitesi, mobil uygulamasını ve/veya web sitesinin reklam verdiği internet sitelerini ziyaret ettiğinizde ilginizi çekebileceğini düşündüğü reklamları size sunabilmek için  &quot;reklam teknolojisini&quot; devreye sokmak amacıyla kullanabilir. Reklam teknolojisi, size özel reklamlar sunabilmek için web sitesine/mobil uygulamaya ve web sitesinin reklam verdiği web sitelerine/mobil uygulamalarına yaptığınız önceki ziyaretlerle ilgili bilgileri kullanır. Bu reklamları sunarken, web sitesinin sizi tanıyabilmesi amacıyla tarayıcınıza benzersiz bir üçüncü taraf çerezi yerleştirilebilir. Bizleal ayrıca Google, Inc. tarafından sağlanan bir web analizi hizmeti olan Google Analytics kullanmaktadır. Google Analytics, çerezleri kullanıcıların web sitesini, mobil uygulamayı ve/veya mobil sitesini nasıl kullandıklarını istatistiki bilgiler/raporlar ile analiz etmek amacıyla kullanır. Google Analytics kullanımı hakkında daha fazla bilgi için (reddetme seçenekleri dahil), şu adresi ziyaret edebilirsiniz: http://www.google.com/intl/tr/policies/privacy/#infocollect
                                        Mobil uygulamada çerez yerine ilgili uygulamanın SDK&quot;sı (Software Development Kit) kullanılmaktadır.
                                    </p>
                                </li>
                                <li>
                                    <strong>Bizleal kişisel verileri hangi amaçlarla kullanıyor?</strong>
                                    <p className="siteInfo">
                                        Bizleal, mevzuatın izin verdiği durumlarda ve ölçüde kişisel bilgilerinizi kaydedebilecek, saklayabilecek, güncelleyebilecek, üçüncü kişilere açıklayabilecek, devredebilecek, sınıflandırabilecek ve işleyebilecektir.
                                        Kişisel verileriniz şu amaçlarla kullanılmaktadır:
                                        web sitesi/mobil uygulamalar üzerinden alışveriş yapanın/yaptıranın kimlik bilgilerini teyit etmek,
                                        iletişim için adres ve diğer gerekli bilgileri kaydetmek,
                                        Mesafeli satış sözleşmesi ve Tüketicinin Korunması Hakkında Kanun&quot;un ilgili maddeleri tahtında akdettiğimiz sözleşmelerin koşulları, güncel durumu ve güncellemeler ile ilgili müşterilerimiz ile iletişime geçmek, gerekli bilgilendirmeleri yapabilmek,
                                        elektronik (internet/mobil vs.) veya kağıt ortamında işleme dayanak olacak tüm kayıt ve belgeleri düzenlemek,
                                        mesafeli satış sözleşmesi ve Tüketicinin Korunması Hakkında Kanun&quot;un ilgili maddeleri tahtında akdettiğimiz sözleşmeler uyarınca üstlenilen yükümlülükleri ifa etmek,
                                        kamu güvenliğine ilişkin hususlarda talep halinde ve mevzuat gereği kamu görevlilerine bilgi verebilmek,
                                        müşterilerimize daha iyi bir alışveriş deneyimini sağlamak,  &quot;müşterilerimizin ilgi alanlarını dikkate alarak&quot; müşterilerimizin ilgilenebileceği ürünlerimiz hakkında müşterilerimize bilgi verebilmek, kampanyaları aktarmak,
                                        müşteri memnuniyetini artırmak, web sitesi ve/veya mobil uygulamalardan alışveriş yapan müşterilerimizi tanıyabilmek ve müşteri çevresi analizinde kullanabilmek, çeşitli pazarlama ve reklam faaliyetlerinde kullanabilmek ve bu kapsamda anlaşmalı kuruluşlar aracılığıyla elektronik ortamda ve/veya fiziki ortamda anketler düzenlemek,
                                        anlaşmalı kurumlarımız ve çözüm ortaklarımız tarafından müşterilerimize öneri sunabilmek, hizmetlerimizle ilgili müşterilerimizi bilgilendirebilmek,
                                        hizmetlerimiz ile ilgili müşteri şikayet ve önerilerini değerlendirebilmek,
                                        yasal yükümlülüklerimizi yerine getirebilmek ve yürürlükteki mevzuattan doğan haklarımızı kullanabilmek,
                                    </p>
                                </li>
                                <li>
                                    <strong>Bizleal kişisel verilerinizi nasıl koruyor?</strong>
                                    <p className="siteInfo">
                                        Bizleal ile paylaşılan kişisel veriler, Bizleal gözetimi ve kontrolü altındadır.
                                        Bizleal, yürürlükteki ilgili mevzuat hükümleri gereğince bilginin gizliliğinin ve bütünlüğünün korunması amacıyla
                                        gerekli organizasyonu kurmak ve teknik önlemleri almak ve uyarlamak konusunda veri sorumlusu sıfatıyla sorumluluğu üstlenmiştir.
                                        Bu konudaki yükümlülüğümüzün bilincinde olarak veri gizliliğini konu alan uluslararası ve ulusal teknik standartlara uygun surette
                                        periyodik aralıklarda sızma testleri yaptırılmakta ve bu kapsamda veri işleme politikalarımızı her zaman güncellediğimizi bilginize sunarız.
                                    </p>
                                </li>
                                <li>
                                    <strong>Bizleal kişisel verilerinizi paylaşıyor mu?</strong>
                                    <p className="siteInfo">
                                        Müşterilerimize ait kişisel verilerin üçüncü kişiler ile paylaşımı, müşterilerin izni çerçevesinde gerçekleşmekte ve kural olarak müşterimizin onayı olmaksızın kişisel
                                        verileri üçüncü kişilere aktarılmamaktadır. Bununla birlikte, yasal yükümlülüklerimiz nedeniyle ve bunlarla sınırlı olmak üzere
                                        mahkemeler ve diğer kamu kurumları ile kişisel veriler paylaşılmaktadır. Ayrıca, taahhüt ettiğimiz hizmetleri sağlayabilmek ve verilen hizmetlerin
                                        kalite kontrolünü yapabilmek için anlaşmalı üçüncü kişilere kişisel veri aktarımı yapılmaktadır.
                                        üçüncü kişilere veri aktarımı sırasında hak ihlallerini önlemek için gerekli teknik ve hukuki önlemler alınmaktadır.
                                        Bununla birlikte, kişisel verileri alan üçüncü kişinin veri koruma politikalarından dolayı ve üçüncü kişinin sorumluluğundaki risk alanında meydana gelen ihlallerden Bizleal sorumlu değildir.
                                        Kişisel verileriniz Bizleal&quot;ın hissedarlarıyla, doğrudan/dolaylı yurtiçi/yurtdışı iştiraklerimize,
                                        faaliyetlerimizi yürütebilmek için işbirliği yaptığımız program ortağı kurum, kuruluşlarla, verilerin bulut ortamında saklanması hizmeti aldığımız
                                        yurtiçi/yurtdışı kişi ve kurumlarla, müşterilerimize ticari elektronik iletilerin gönderilmesi konusunda anlaşmalı olduğumuz yurtiçi/yurtdışındaki kuruluşlarla,
                                        Bankalararası Kart Merkeziyle, anlaşmalı olduğumuz bankalarla ve sizlere daha iyi hizmet sunabilmek ve müşteri memnuniyetini sağlayabilmek için çeşitli pazarlama
                                        faaliyetleri kapsamında yurtiçi ve yurtdışındaki çeşitli ajans, reklam şirketleri ve anket şirketleriyle ve yurtiçi/yurtdışı diğer üçüncü kişilerle ve ilgili iş
                                        ortaklarımızla paylaşılabilmektedir.
                                    </p>
                                </li>
                                <li>
                                    <strong> Kişisel Verilerin Korunması Kanunu&quot;ndan doğan haklarınız nelerdir?</strong>
                                    <div className="siteInfo">
                                        KVKK uyarınca kişisel verilerinizin;
                                        <ol type="a">
                                            <li>
                                                İşlenip işlenmediğini öğrenme,
                                            </li>

                                            <li>
                                                İşlenmişse bilgi talep etme,
                                            </li>

                                            <li>
                                                İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,
                                            </li>

                                            <li>
                                                Yurt içinde / yurt dışında aktarıldığı 3. kişileri bilme,
                                            </li>

                                            <li>
                                                Eksik / yanlış işlenmişse düzeltilmesini isteme,
                                            </li>

                                            <li>
                                                KVKK&quot;nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini / yok edilmesini isteme,

                                            </li>

                                            <li>
                                                Aktarıldığı 3. kişilere yukarıda sayılan (d) ve (e) bentleri uyarınca yapılan işlemlerin bildirilmesini isteme,
                                            </li>
                                            <li>
                                                Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
                                            </li>

                                            <li>
                                                KVKK&quot;ya aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme haklarına sahip olduğunuzu hatırlatmak isteriz.
                                            </li>

                                        </ol>

                                    </div>
                                </li>

                                <li>
                                    <strong>Kişisel verilerle ilgili mevzuat değişikliklerinden nasıl haberdar olabilirim?</strong>
                                    <p className="siteInfo">
                                        KVKK uyarınca sahip olduğunuz haklar Bizleal&quot;ın yükümlülükleridir. Kişisel verilerinizi bu bilinçle ve mevzuatın gerektirdiği
                                        ölçüde işlediğimizi, yasal değişikliklerin olması halinde sayfamızda yer alan bu bilgileri yeni mevzuata uygun güncelleyeceğimizi,
                                        yapılan güncellemeleri de bu sayfa üzerinden her zaman kolaylıkla takip edebileceğinizi size bildirmek isteriz.
                                    </p>
                                </li>

                                <li>
                                    <strong>Verinin güncel ve doğru tutulduğundan nasıl emin olabilirim?</strong>
                                    <p className="siteInfo">
                                        KVKK&quot;nın 4. maddesi uyarınca Bizleal&quot;ın kişisel verilerinizi doğru ve güncel olarak tutma yükümlülüğü bulunmaktadır.
                                        Bu kapsamda Bizleal&quot;ın yürürlükteki mevzuattan doğan yükümlülüklerini yerine getirebilmesi için müşterilerimizin
                                        Bizleal&quot;la doğru ve güncel verilerini paylaşması gerekmektedir. Verilerinizin herhangi bir surette değişikliğe uğraması halinde
                                        aşağıda belirtilen iletişim kanallarından bizimle iletişime geçerek verilerinizi güncellemenizi rica ederiz.
                                    </p>
                                </li>

                                <li>
                                    <strong>Bizleal&quot;a kişisel verilerinizle ilgili soru sormak ister misiniz?</strong>
                                    <p className="siteInfo">
                                        Kişisel veri saklama ve imha politikamız bulunmaktadır. Bize kişisel verilerinizle ilgili her türlü soru ve görüşleriniz için info@bizleal.com e-posta adresinden dilediğiniz zaman ulaşabilirsiniz.
                                    </p>
                                </li>

                            </ol>

                            <p className="siteInfo">
                                Daha fazla bilgi için, lütfen
                                {' '}
                                <Link href={"/site/iletisim"}>
                                    <a>Bize Ulaşın</a>
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SitePagePrivacy;
