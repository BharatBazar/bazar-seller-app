import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AIC, BGCOLOR, FDR, MT } from '@app/common/styles';
import { GENERAL_PADDING, MLA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import { colorCode, mainColor } from '@app/common/color';
import WrappedText from '@app/screens/component/WrappedText';
import { FontFamily, fs18 } from '@app/common';
import RBSheet from 'react-native-raw-bottom-sheet';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image } from 'react-native';
import { add } from 'react-native-reanimated';

 var totalItem:[]=[]

const CreateBill: React.FC = ({ navigation, route }) => {
    const [modalHeight, setModalHeight] = React.useState(400)
    const [color, setColor] = React.useState("#ffffff")
    const [id, setId] = React.useState<Number>()
    const [item, setItem] = useState([])

   

    const refRBSheet = useRef();

    useEffect(() => {
        if (route.params.openModal === true) {
            refRBSheet.current.open();
        }
    }, [modalHeight]);

   const products = [
       {
           _id:1,
           name:"Mens",
           subName:"Shirt",
           color:"red",
           price:100
       },
       {
           _id:2,
           name:"Womens",
           subName:"Jeans",
           color:"blue",
           price:200
       },
       {
           _id:3,
           name:"Child",
           subName:"Shoes",
           color:"orange",
           price:700
       },
   ]

   const findProduct = (id:number)=>{
    const product = products.find(e=>e._id === Number(id))
    setModalHeight(600)
    setItem([product])
   }

   const Add = (item:any)=>{
        totalItem.push(item)
        setItem([])
       refRBSheet.current.close()
       console.log(totalItem);
   }

   const renderData = ({item})=>{
       return(
           <>
            <View style={{paddingHorizontal:20}}>
                           <View style={{ padding:3,marginTop: 25, borderWidth: 1, borderColor: mainColor, borderRadius: 5, justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={{ width: 70, height: 70, borderRadius: 8, alignSelf: "center" }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZFOYL7gHQna3k8UoVy987SdLOVm1wVioBw&usqp=CAU" }} />
                            <View style={{ alignSelf: "center",marginLeft:15 }}>
                                <Text style={{ fontFamily: FontFamily.Medium }}>{item.name}</Text>
                                <Text style={{ fontFamily: FontFamily.Regular }}>1 × {item.subName}</Text>
                            </View>
                        </View>
                        <View style={{borderRadius:12.5,width:25,height:25,alignSelf:"center",backgroundColor:item.color}}>
                            
                        </View>
                        <View style={{borderRadius:"1",alignSelf:"center"}}>
                            <Text style={{fontFamily:FontFamily.Bold,color:"#252525",marginRight:10}}>₹ {item.price}</Text>
                        </View>
                        <TouchableOpacity style={{alignSelf:"center"}}>
                            <DeleteIcon name='delete' size={22} color={"#252525"}/>
                        </TouchableOpacity>
                    </View>
                
            </View>
           </>
       )
   }

    return (
        <View style={{ flex: 1, backgroundColor: color }}>
            <View style={[BGCOLOR(mainColor), PVA(), AIC(), PTA(STATUS_BAR_HEIGHT + GENERAL_PADDING), FDR('row')]}>
                {
                    <ButtonMaterialIcons
                        onPress={() => {
                            navigation.goBack();
                        }}
                        iconName={'arrow-back'}
                        containerStyle={[MLA()]}
                        iconColor={colorCode.WHITE}
                    />
                }
                <WrappedText
                    text={'Create Bill'}
                    fontSize={fs18}
                    textColor={'#ffffff'}
                    textAlign="center"
                    containerStyle={{ marginLeft: 20 }}
                    fontFamily={FontFamily.Medium}
                />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <RightComponentButtonWithLeftText
                    buttonText={'Add Product'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        console.log(totalItem)
                        refRBSheet.current.open()
                        setModalHeight(400)
                    }}
                />
            </View>
            <View style={{ width:"100%",position:"absolute",bottom:0 }}>
                <RightComponentButtonWithLeftText
                    buttonText={'Continue'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        console.log(totalItem)
                        refRBSheet.current.open()
                        setModalHeight(400)
                    }}
                />
            </View>

            {totalItem.length > 0?(<>
           <FlatList
           data={totalItem}
           renderItem={renderData}
           />
            </>):(null)}

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={modalHeight}
                onOpen={() => setColor("grey")}
                onClose={() => setColor("#ffffff")}
                animationType={"slide"}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                        flex: 1
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                }}
            >
                <View style={{ paddingHorizontal: 20 ,flex:1}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                fontFamily: FontFamily.Helvatica,
                                fontSize: 16,
                                alignSelf: 'center',
                            }}
                        >
                            Add Product
                        </Text>
                        <TouchableOpacity onPress={() =>{
                             refRBSheet.current.close()
                             setItem([])
                        }} style={{ borderRadius: 15, backgroundColor: mainColor }}>
                            <CrossIcon name="cross" color={"#ffffff"} size={24} style={{ alignSelf: "center" }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontFamily: FontFamily.Regular }}>Enter Item Id</Text>
                        <TextInput onChangeText={(id)=>setId(id)} style={{ borderWidth: 1, borderColor: mainColor, height: 35, marginTop: 5, borderRadius: 5 }} />
                        <TouchableOpacity onPress={() =>findProduct(id)} style={{ marginTop: 15, padding: 3, width: 70, borderRadius: 5, backgroundColor: mainColor }}>
                            <Text style={{ fontFamily: FontFamily.Bold, color: "#ffffff", alignSelf: "center" }}>Enter</Text>
                        </TouchableOpacity>
                    </View>
                   {
                       item.length === 1?(
                           <>
                            <View style={{padding:3, marginTop: 25, borderWidth: 1, borderColor: mainColor, borderRadius: 5, justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={{ width: 70, height: 70, borderRadius: 8, alignSelf: "center" }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZFOYL7gHQna3k8UoVy987SdLOVm1wVioBw&usqp=CAU" }} />
                            <View style={{ alignSelf: "center" ,marginLeft:15}}>
                                <Text style={{ fontFamily: FontFamily.Medium }}>{item[0].name}</Text>
                                <Text style={{ fontFamily: FontFamily.Regular }}>1 × {item[0].subName}</Text>
                            </View>
                        </View>
                        <View style={{borderRadius:12.5,width:25,height:25,alignSelf:"center",backgroundColor:!item[0].color?"red":item[0].color}}>
                            
                        </View>
                        <View style={{alignSelf:"center"}}>
                            <Text style={{fontFamily:FontFamily.Bold,color:"#252525",marginRight:10}}>₹ {item[0].price}</Text>
                        </View>
                        
                    </View>

                    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
                        <Text style={{fontFamily:FontFamily.Regular,fontSize:17,alignSelf:"center"}}>Quantity</Text>
                        <TextInput style={{ borderBottomColor:mainColor,borderBottomWidth:1,alignSelf:"center",fontSize:17,fontFamily:FontFamily.Regular}}/>
                    </View>
                    <View style={{borderWidth:.7,marginTop:10}}>

                    </View>
                    <View style={{flexDirection:"row",marginTop:10,justifyContent:"space-between"}}>
                        <Text style={{fontFamily:FontFamily.Regular,fontSize:17,alignSelf:"center"}}>Total</Text>
                        <Text style={{fontFamily:FontFamily.Bold,color:"#252525",marginRight:10,fontSize:17}}>₹ {item[0].price}</Text>
                    </View>
                           </>
                       ):(null)
                   }
                 
                  
                </View>
                   <View style={{position:"absolute",bottom:0,width:"100%",alignSelf:"center"}}>
                            <RightComponentButtonWithLeftText
                    buttonText={'Add'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        Add(item[0])
                    }}
                />
                  
                     </View>
                      
                
               
            </RBSheet>
        </View>
    );
};

export default CreateBill;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        // justifyContent: 'center',
        // backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});
