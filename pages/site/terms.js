import PageHeader from '../../components/shared/PageHeader';
import Head from 'next/head'
// data stubs
import theme from '../../data/theme';

function SitePageTerms() {
    const breadcrumb = [
        { title: 'Ana Sayfa', url: '/' },
        { title: 'Kullanım Koşulları', url: '/site/kosullar' },
    ];

    return (
        <>
            <Head>
                <title>{`Kullanım Koşulları — ${theme.name}`}</title>
                <meta name="description" content="Bizleal kullanım koşulları" />
                <meta name="keywords" content="bizleal kullanım koşulları" />
            </Head>

            <PageHeader breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="document">
                        <div className="document__header">
                            <h5 className="document__title">KULLANIM KOŞULLARI</h5>
                        </div>
                        <div className="document__content typography">
                            <ol className="siteInfo">
                                <p>
                                    Bu internet sitesine girmeniz veya bu internet sitesindeki herhangi bir bilgiyi kullanmanız aşağıdaki koşulları kabul ettiğiniz anlamına gelir.
                                </p>
                                <li>
                                    Bu internet sitesine girilmesi, sitenin ya da sitedeki bilgilerin ve diğer verilerin programların vs. kullanılması sebebiyle, sözleşmenin ihlali, haksız fiil,
                                    ya da başkaca sebeplere binaen, doğabilecek doğrudan ya da dolaylı hiçbir zarardan
                                    {' '}
                                    {theme.company.name}
                                    {' '}
                                    sorumlu değildir.
                                </li>

                                <li>
                                    {theme.company.name}
                                    , sözleşmenin ihlali, haksız fiil, ihmal veya diğer sebepler neticesinde; işlemin kesintiye uğraması, hata, ihmal, kesinti hususunda herhangi bir sorumluluk kabul etmez.
                                </li>

                                <li>
                                    {theme.company.name}
                                    {' '}
                                    işbu site ve site uzantısında mevcut her tür hizmet, ürün, siteyi kullanma koşulları ile sitede sunulan bilgileri önceden bir ihtara gerek olmaksızın değiştirme, siteyi yeniden organize etme, yayını durdurma hakkını saklı tutar. Değişiklikler sitede yayım anında yürürlüğe girer. Sitenin kullanımı ya da siteye giriş ile bu değişiklikler de kabul edilmiş sayılır. Bu koşullar link verilen diğer web sayfaları için de geçerlidir.
                                </li>
                                <li>
                                    {theme.company.name}
                                    , sözleşmenin ihlali, haksız fiil, ihmal veya diğer sebepler neticesinde; işlemin kesintiye uğraması, hata, ihmal, kesinti, silinme, kayıp, işlemin veya iletişimin gecikmesi, bilgisayar virüsü, iletişim hatası, hırsızlık, imha veya izinsiz olarak kayıtlara girilmesi, değiştirilmesi veya kullanılması hususunda herhangi bir sorumluluk kabul etmez.
                                </li>

                                <li>
                                    Bu internet sitesi
                                    {' '}
                                    {theme.company.name}
                                    &apos; in kontrolü altında olmayan başka internet sitelerine bağlantı veya referans içerebilir.
                                    {' '}
                                    {theme.company.name}
                                    , bu sitelerin içerikleri veya içerdikleri diğer bağlantılardan sorumlu değildir.
                                </li>

                                <li>
                                    {theme.company.name}
                                    &apos;
                                    bu internet sitesinin genel görünüm ve dizaynı ile internet sitesindeki tüm bilgi, resim, Bizleal markası ve diğer markalar,
                                    www.bizleal.com alan adı, logo, ikon, demonstratif, yazılı, elektronik, grafik veya makinede okunabilir şekilde sunulan teknik veriler,
                                    bilgisayar yazılımları, uygulanan satış sistemi, iş metodu ve iş modeli de dahil tüm materyallerin
                                    (&apos;Materyaller&apos;) ve bunlara ilişkin fikri ve sınai mülkiyet haklarının sahibi veya lisans sahibidir ve yasal koruma altındadır.
                                    Internet sitesinde bulunan hiçbir Materyal; önceden izin alınmadan ve kaynak gösterilmeden, kod ve yazılım da dahil olmak üzere, değiştirilemez, kopyalanamaz,
                                    çoğaltılamaz, başka bir lisana çevrilemez, yeniden yayımlanamaz, başka bir bilgisayara yüklenemez, postalanamaz, iletilemez, sunulamaz ya da dağıtılamaz.
                                    Internet sitesinin bütünü veya bir kısmı başka bir internet sitesinde izinsiz olarak kullanılamaz. Aksine hareketler hukuki ve cezai sorumluluğu gerektirir.
                                    {theme.company.name}
                                    &apos;nin burada açıkça belirtilmeyen diğer tüm hakları saklıdır.
                                </li>

                                <li>
                                    {theme.company.name}
                                    , dilediği zaman bu yasal uyarı sayfasının içeriğini güncelleme yetkisini saklı tutmaktadır ve kullanıcılarına siteye her girişte yasal uyarı sayfasını ziyaret etmelerini tavsiye etmektedir.
                                </li>

                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SitePageTerms;
