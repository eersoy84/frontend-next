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
import {
  createAd, addCategory, addBrand, addModel, addProduct,
} from '../../store/category/categoryActions';
import theme from '../../data/theme';

export class CreateCatalogItems extends Component {
  constructor(props) {
    super(props);
    // this.validator = new SimpleReactValidator();
    this.validator = new SimpleReactValidator({
      messages: {
        required: 'zorunlu alan(!)',
      },
    });

    this.state = {
      selectedCategory: { id: 0, name: '' },
      selectedSubCategory: { id: 0, name: '' },
      selectedBrand: { id: 0, name: '' },
      selectedModel: { id: 0, productId: 0, name: '' },
      subCategories: [],
      brands: [],
      models: [],
      file: {},

    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.categories) !== JSON.stringify(prevProps.categories)) {

    }
  }

  categoryList = () => {
    const { categories } = this.props;
    const { selectedCategory } = this.state;
    return (
      <div className="form-group">
        <label htmlFor="category">Kategori</label>
        <CreatableSelect
          getNewOptionData={(value, label) => ({
            id: value,
            name: label,
            isNew: true,
          })}
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
    const { subCategories, selectedCategory } = this.state;

    return (
      // (subCategories && subCategories.length > 0) &&
      <div className="form-group">
        <label htmlFor="subCategory">Alt Kategori</label>
        <CreatableSelect
          value={this.state.selectedSubCategory}
          getNewOptionData={(value, label) => ({
            id: value,
            name: label,
            isNew: true,
          })}
          getOptionValue={(v) => v.id}
          getOptionLabel={(v) => v.name}
          onChange={this.handleSubCategoryChange}
          onCreateOption={this.handleCreateSubCategory}
          options={subCategories}
          placeholder="alt kategori seçiniz..."
          isDisabled={selectedCategory.id === 0}
        />
        {this.validator.message('alt kategori', this.state.selectedSubCategory, 'required', { className: 'text-danger' })}

      </div>
    );
  }

  brandList = () => {
    const {
      brands, selectedBrand, selectedCategory, selectedSubCategory,
    } = this.state;
    const isDisabled = !!((selectedSubCategory.id === 0 && selectedCategory.id === 0));
    return (
      // (brands && brands.length > 1) &&
      <div className="form-group">
        <label htmlFor="brands">Marka</label>
        <CreatableSelect
          getNewOptionData={(value, label) => ({
            id: value,
            name: label,
            isNew: true,
          })}
          value={selectedBrand}
          getOptionValue={(v) => v.id}
          getOptionLabel={(v) => v.name}
          onChange={this.handleBrandChange}
          onCreateOption={this.handleCreateBrand}
          options={brands}
          placeholder="marka seçiniz..."
          isDisabled={isDisabled}
        />

      </div>
    );
  }

  modelList = () => {
    const { models, selectedModel } = this.state;
    return (
      <div className="form-group">
        <label htmlFor="models">Model</label>
        <CreatableSelect
          getNewOptionData={(value, label) => ({
            id: value,
            name: label,
            isNew: true,
          })}
          value={selectedModel}
          getOptionValue={(v) => v.id}
          getOptionLabel={(v) => v.name}
          onChange={this.handleModelChange}
          options={models}
          placeholder="model seçiniz..."
          onCreateOption={this.handleCreateModel}
        />

      </div>
    );
  }

  handleCategoryChange = (newValue, actionMeta) => {
    const { categories } = this.props;

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
    const CategoryModel = { Id: 0, Name: inputValue, ParentId: null };
    this.props.addCategory(CategoryModel);
  };

  handleSubCategoryChange = (newValue, actionMeta) => {
    const { subCategories } = this.state;
    const subCategory = subCategories && subCategories.find((q) => q.id === parseInt(newValue.id));

    this.setState(
      {
        selectedSubCategory: newValue,
        selectedBrand: { id: 0, name: 'marka seçiniz...' },
        selectedModel: { id: 0, productId: 0, name: 'model seçiniz...' },
        brands: subCategory && subCategory.brands,
        models: [],
      },
    );
  };

  handleCreateSubCategory = (newValue) => {
    const { selectedCategory } = this.state;
    const CategoryModel = { Id: 0, Name: newValue, ParentId: selectedCategory.id };
    this.props.addCategory(CategoryModel);
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

  handleCreateBrand = (newValue, actionMeta) => {
    const { selectedCategory, selectedSubCategory, selecctedBrand } = this.state;
    const categoryId = (selectedSubCategory && selectedSubCategory.id > 0) ? selectedSubCategory.id : selectedCategory.id;
    // let BrandCategoryModel = {
    //     BrandId: 0,
    //     CategoryId: categoryId,
    //     Brand: {
    //         id: 0, Name: newValue
    //     }
    // }
    const BrandCategories = [];
    BrandCategories.push({ BrandId: null, CategoryId: categoryId });
    const BrandModel = {
      Name: newValue,
      BrandCategories,
    };
    this.props.addBrand(BrandModel);
  };

  handleModelChange = (newValue, actionMeta) => {
    this.setState(
      {
        selectedModel: newValue,
      },
    );
  };

  handleCreateModel = (newValue) => {
    const { selectedCategory, selectedSubCategory, selectedBrand } = this.state;
    const categoryId = (selectedSubCategory && selectedSubCategory.id > 0) ? selectedSubCategory.id : selectedCategory.id;

    const ModelModel = {
      Name: newValue,
      BrandId: selectedBrand.id,
      CategoryId: categoryId,
    };
    this.props.addModel(ModelModel);
  };

  onDrop = (picture) => {
    this.setState({
      photo: picture[0],
    });
  }

  onDrop = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      selectedCategory,
      selectedSubCategory,
      selectedBrand,
      selectedModel,
      file,
    } = this.state;

    const categoryId = (selectedSubCategory && selectedSubCategory.id > 0) ? selectedSubCategory.id : selectedCategory.id;

    // if (selectedModel.productId === 0) {
    //     return;
    // }
    const formData = new FormData();
    formData.append('Id', selectedModel && selectedModel.productId);
    formData.append('CategoryId', categoryId);
    formData.append('BrandId', selectedBrand.id);
    formData.append('ModelId', selectedModel.id);
    formData.append('File', file);

    this.props.addProduct(formData);
  }

  render() {
    const {
      selectedCategory,
      selectedSubCategory,
      selectedBrand,
      selectedModel,
      photo,
    } = this.state;

    const isModelSelected = selectedModel.id > 0;

    return (
      <>
        <Helmet>
          <title>{`Katalog Ekle — ${theme.name}`}</title>
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
                <div className="col-lg-4" />

                {isModelSelected
                  && (
                    <>

                      <div className="col-lg-4">
                        <p><strong>Ürün Özellikleri</strong></p>

                        <div className="form-group">
                          {/* <ImageUploader
                                                    label={''}
                                                    buttonText='Resim Ekle'
                                                    onChange={this.onDrop}
                                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                    maxFileSize={5242880}
                                                /> */}
                          <input type="file" onChange={this.onDrop} />
                        </div>

                      </div>
                    </>
                  )}

              </div>
              {isModelSelected
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
CreateCatalogItems.propTypes = {
  values: array,
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,

});

const mapDispatchToProps = {
  createAd,
  addCategory,
  addBrand,
  addModel,
  addProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCatalogItems);
