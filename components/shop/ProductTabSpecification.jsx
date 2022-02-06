function ProductTabSpecification({ adSpecs }) {
  // const sections = specs.map((section, index) => {
  //     console.log(specs);
  //     const features = section.features.map((feature, index) => (
  //         <div key={index} className="spec__row">
  //             <div className="spec__name">{feature.name}</div>
  //             <div className="spec__value">{feature.value}</div>
  //         </div>
  //     ));

  //     return (
  //         <div key={index} className="spec__section">
  //             <h4 className="spec__section-title">{section.name}</h4>
  //             {features}
  //         </div>
  //     );
  // });

  // products.find((x) => x.adId === parseFloat(match.params.adId));

  const features = adSpecs && adSpecs.map((spec, index) => (
    <div key={index} className="spec__row">
      <div className="spec__name">{spec.name}</div>
      <div className="spec__value">{spec.value}</div>
    </div>
  ));

  const sections = (
    <div className="spec__section">
      <h4 className="spec__section-title">Ürün Özellikleri</h4>
      {features}
    </div>
  );

  return (
    <div className="spec">
      {/* <h3 className="spec__header">Özellikler</h3> */}
      {sections}
      {/* <div className="spec__disclaimer">
                Aynı ürün, farklı özellikleri ile farklı zamanlarda ilana çıkabilir. Bu tamamen tedarikçilerle yapılan anlaşmalarla sınırlıdır. Bundan dolayı bizleal.com sorumluluğu bulunmamaktadır.
            </div> */}
    </div>
  );
}

export default ProductTabSpecification;
