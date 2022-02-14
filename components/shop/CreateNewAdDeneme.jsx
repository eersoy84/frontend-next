import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Creatable } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { array, checkPropTypes, number } from 'prop-types';
import ImageUploader from 'react-images-upload';
import NumberFormat from 'react-number-format';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { createAd } from '../../store/category/categoryActions';
import theme from '../../data/theme';

export class CreateNewAdDeneme extends Component {
  constructor(props) {
    super(props);
    // this.validator = new SimpleReactValidator();
    this.validator = new SimpleReactValidator({
      messages: {
        required: 'zorunlu alan(!)',
      },
    });

    const { categories } = this.props;
    this.state = {
      newCategory: { id: 0, name: '' },
      selectedCategory: { id: 0, name: '' },
      selectedSubCategory: { id: 0, name: '' },
      selectedBrand: { id: 0, name: '' },
      selectedModel: { id: 0, productId: 0, name: '' },
      subCategories: [],
      brands: [],
      models: [],
      photo: {},
      price: '',
      maxDiscountPercent: '',
      endDay: '',
      quantity: '',
      minParticipant: '',
      maxParticipant: '',

    };
  }

  categoryList = () => {
    const { selectedCategory } = this.state;
    const { categories } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="category">Kategori</label>
        <CreatableSelect
          // getNewOptionData={(value, label) => ({
          //     id: value,
          //     name: label,
          //     isNew: true
          // })}
          name="category"
          // value={selectedCategory}
          getOptionValue={(v) => v.id}
          getOptionLabel={(v) => v.name}
          onChange={this.handleCategoryChange}
          onInputChange={this.handleCategoryInputChange}
          options={categories}
          onCreateOption={this.handleCreateCategory}
          placeholder="kategori seçiniz..."
        />
        {this.validator.message('category', selectedCategory.id === 0, 'required', { className: 'text-danger' })}
      </div>
    );
  }

  subCategoryList = () => {
    const { subCategories } = this.state;

    return (
      (subCategories && subCategories.length > 0) && (
        <div className="form-group">
          <label htmlFor="subCategory">Alt Kategori</label>
          <CreatableSelect
            value={this.state.selectedSubCategory}
            getOptionValue={(v) => v.id}
            getOptionLabel={(v) => v.name}
            onChange={this.handleSubCategoryChange}
            onInputChange={this.handleSubCategoryInputChange}
            options={subCategories}
            placeholder="alt kategori seçiniz..."
          />
          {this.validator.message('alt kategori', this.state.selectedSubCategory, 'required', { className: 'text-danger' })}

        </div>
      ));
  }

  brandList = () => {
    const { brands, selectedBrand } = this.state;

    return (
      (brands && brands.length > 0)
      && (
        <div className="form-group">
          <label htmlFor="brands">Marka</label>
          <CreatableSelect
            value={selectedBrand}
            getOptionValue={(v) => v.id}
            getOptionLabel={(v) => v.name}
            onChange={this.handleBrandChange}
            onInputChange={this.handleBrandInputChange}
            options={brands}
            placeholder="marka seçiniz..."
          />

        </div>
      ));
  }

  modelList = () => {
    const { models, selectedModel } = this.state;

    return (
      (models && models.length > 0) && (
        <div className="form-group">
          <label htmlFor="models">Model</label>
          <CreatableSelect
            value={selectedModel}
            getOptionValue={(v) => v.id}
            getOptionLabel={(v) => v.name}
            onChange={this.handleModelChange}
            options={models}
            placeholder="model seçiniz..."
            onCreateOption={this.deneme}
          />

        </div>
      ));
  }

  deneme = (actionMeta) => {
    console.log(actionMeta.action);
  }

  handleCategoryChange = (newValue) => {
    const { categories } = this.props;
    console.log('categories=>', categories);

    this.setState(
      {
        selectedCategory: newValue,
        selectedSubCategory: { id: 0, name: 'alt kategori seçiniz...' },
        selectedBrand: { id: 0, name: 'marka seçiniz...' },
        selectedModel: { id: 0, productId: 0, name: '' },
        subCategories: [],
        brands: [],
        models: [],
      },
    );
    const category = categories && categories.find((q) => q.id === parseInt(newValue.id));
    const { subCategories, brands } = category;
    if (category && category.subCategories?.length > 0) {
      this.setState(
        {
          subCategories, // : category.subCategories,
          brands: [],
        },
      );
    } else {
      this.setState(
        {
          subCategories: [],
          brands, // : category.brands
        },
      );
    }
  };

  handleCreateCategory = (inputValue, actionMeta) => {
    const newCategories = this.state.categories;
    const newCategory = { id: 0, name: inputValue };
    newCategories.push(newCategory);
    this.setState(
      {
        newCategory: { id: 0, name: inputValue },
        categories: newCategories,
      },
    );

    console.log(inputValue);
    console.groupEnd();
  };

  handleSubCategoryChange = (newValue, actionMeta) => {
    const { subCategories } = this.state;
    const subCategory = subCategories && subCategories.find((q) => q.id === parseInt(newValue.id));

    this.setState(
      {
        selectedSubCategory: newValue,
        selectedBrand: { id: 0, name: 'marka seçiniz...' },
        selectedModel: { id: 0, productId: 0, name: 'model seçiniz...' },
        brands: subCategory.brands,
        models: [],
      },
    );
  };

  handleSubCategoryInputChange = (inputValue, actionMeta) => {

  };

  handleBrandChange = (newValue, actionMeta) => {
    const { brands } = this.state;
    const brand = brands && brands.find((q) => q.id === parseInt(newValue.id));
    this.setState(
      {
        selectedBrand: newValue,
        selectedModel: { id: 0, productId: 0, name: 'model seçiniz...' },
        models: brand.models,
      },
    );
  };

  handleBrandInputChange = (inputValue, actionMeta) => {

  };

  handleModelChange = (newValue, actionMeta) => {
    this.setState(
      {
        selectedModel: newValue,
      },
    );
  };

  handleModelInputChange = (inputValue, actionMeta) => {

  };

  handlePrice = (values) => {
    this.setState({ price: values.value });
  }

  handleDiscountPercent = (values) => {
    this.setState({ maxDiscountPercent: values.value });
  }

  handleQuantity = (values) => {
    this.setState({ quantity: values.value });
  }

  handleEndDay = (values) => {
    this.setState({ endDay: values.value });
  }

  handleMinParticipant = (values) => {
    this.setState({ minParticipant: values.value });
  }

  handleMaxParticipant = (values) => {
    this.setState({ maxParticipant: values.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      selectedModel, price, quantity,
      maxDiscountPercent, endDay,
      minParticipant, maxParticipant,
    } = this.state;
    if (selectedModel.productId === 0) {
      return;
    }
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return;
    }
    if (selectedModel.id === 0) {
      toast.info('Lütfen model kategorisinden seçim yapınız!');
      return;
    }
    const ProductFeatureModel = {
      ProductId: selectedModel.productId,
      MinParticipants: parseInt(minParticipant),
      MaxParticipants: parseInt(maxParticipant),
      MaxDiscountPercent: parseFloat(maxDiscountPercent) / 100,
      ProductPrice: parseFloat(price),
      Quantity: parseInt(quantity),
      EndDay: parseInt(endDay),
    };
    this.props.createAd(ProductFeatureModel);
    console.log('productFeatureModel', ProductFeatureModel);
    console.log('submit', this.state);
  }

  limitMaxDiscountPercent(values) {
    const { floatValue } = values;
    return floatValue > 0 && floatValue < 100;
  }

  limitMaxEndDay(values) {
    const { value } = values;
    return value >= 0 && value < 31;
  }

  render() {
    const {
      selectedCategory,
      selectedSubCategory,
      selectedBrand,
      selectedModel,
      photo, price, quantity,
      maxDiscountPercent, endDay,
      minParticipant, maxParticipant,
    } = this.state;
    const isProductExist = selectedModel.productId == 0;
    console.log("selectedModel", selectedModel)

    return (
      <>
        <Helmet>
          <title>{`Yeni İlan Ekle — ${theme.name}`}</title>
        </Helmet>

        {/* <PageHeader header="Yeni İlan" breadcrumb={breadcrumb} /> */}

        <div className="block">
          <div className="container">

            <form onSubmit={this.handleSubmit} noValidate>
              <div className="row">

                <div className="col-lg-4">
                  <p><strong>Kategoriler</strong></p>

                  {this.categoryList()}
                  {this.subCategoryList()}
                  {this.brandList()}
                  {this.modelList()}

                </div>

                {isProductExist
                  && (
                    <>
                      <div className="col-lg-4">
                        <p><strong>İlan Bilgileri</strong></p>

                        <div className="row">

                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="price">Ürün Fiyatı</label>
                              <NumberFormat
                                thousandSeparator
                                suffix=" ₺"
                                name="price"
                                className="form-control"
                                onValueChange={this.handlePrice}
                                value={price}
                              />
                              {this.validator.message('price', price, 'required', { className: 'text-danger' })}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="discountPercent">Max. İndirim Oranı</label>
                              <NumberFormat
                                prefix="% "
                                isAllowed={this.limitMaxDiscountPercent}
                                name="discountPercent"
                                className="form-control"
                                onValueChange={this.handleDiscountPercent}
                                value={maxDiscountPercent}
                              />
                              {this.validator.message('maxDiscountPercent', maxDiscountPercent, 'required', { className: 'text-danger' })}
                            </div>

                          </div>

                        </div>

                        <div className="row">

                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="quantity">Miktar/Adet</label>
                              <NumberFormat
                                name="quantity"
                                decimalSeparator={false}
                                className="form-control"
                                onValueChange={this.handleQuantity}
                                value={quantity}
                              />
                              {this.validator.message('quantity', quantity, 'required', { className: 'text-danger' })}

                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="endDay">İlan Süresi</label>
                              <NumberFormat
                                isAllowed={this.limitMaxEndDay}
                                suffix=" gün"
                                name="endDay"
                                decimalSeparator={false}
                                className="form-control"
                                onValueChange={this.handleEndDay}
                                value={endDay}
                              />
                              {this.validator.message('endDay', endDay, 'required', { className: 'text-danger' })}

                            </div>
                          </div>
                        </div>

                        <div className="row">

                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="minParticipant">Min. Katılımcı</label>
                              <NumberFormat
                                suffix=" kişi"
                                name="minParticipant"
                                decimalSeparator={false}
                                className="form-control"
                                onValueChange={this.handleMinParticipant}
                                value={minParticipant}
                              />
                              {this.validator.message('minParticipant', minParticipant, 'required', { className: 'text-danger' })}

                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="maxParticipant">Max. Katılımcı</label>
                              <NumberFormat
                                suffix=" kişi"
                                name="maxParticipant"
                                decimalSeparator={false}
                                className="form-control"
                                onValueChange={this.handleMaxParticipant}
                                value={maxParticipant}
                              />
                              {this.validator.message('maxParticipant', maxParticipant, 'required', { className: 'text-danger' })}

                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="col-lg-4">
                        <p><strong>Ürün Özellikleri</strong></p>

                        {/* <div className="form-group">
                                        <ImageUploader
                                            label={''}
                                            buttonText='Resim Ekle'
                                            onChange={this.onDrop}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                        />

                                    </div> */}

                      </div>
                    </>
                  )}

              </div>
              {isProductExist
                && (
                  <div className="row">
                    <div className="col-lg-4" />
                    <div className="col-lg-4" />
                    <div className="col-lg-4">

                      <div style={{
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'stretch',
                      }}
                      >
                        <div className="d-grid">

                          <button type="submit" className="btn btn-primary btn-lg">
                            Yeni İlan Ekle
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

            </form>
          </div>
        </div>
      </>
    );
  }
}
CreateNewAdDeneme.propTypes = {
  values: array,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,

});

const mapDispatchToProps = {
  createAd,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewAdDeneme);
