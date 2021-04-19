import React from 'react';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { IRProduct, IRProducts, productStatus } from '../../../server/apis/product/product.interface';
import { APIgetAllProduct } from '../../../server/apis/product/produt.api';

export interface ProductListProps {}

const ProductList: React.SFC<ProductListProps> = () => {
    const [loading, setLoader] = useState(false);
    const [product, setProduct] = useState<IRProduct[]>([]);

    const fetchProducts = async () => {
        try {
            const response: IRProducts = await APIgetAllProduct({
                query: {
                    productCategory: 'Footwear',
                    productSubCategory1: 'Mens',
                    productSubCategory2: 'Sports Shoes',
                    productStatus: productStatus.NOTCOMPLETED,
                },
            });
            setProduct(response.payload);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {}, []);

    return <View style={{ flex: 1 }}></View>;
};

export default ProductList;
