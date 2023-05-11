import { useState, useEffect } from 'react';
import styles from './ListProducts.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/index.js';

export default function ListProducts() {
    const [productList, setProductList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://juniortestleandrosoares.dominionlps.com/API/dataHandler.php')
            .then(data => data.json())
            .then(jsonData => setProductList(jsonData));
    }, []);

    function orderList() {
        let mockList = productList.slice();
        const orderingType = event.target.value || 'id';

        switch (orderingType) {
            case 'createdAt':
                mockList.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
                break;
            default:
                mockList.sort((a, b) => a.id - b.id);
                break;
        }
        setProductList(mockList);
    }

    function massDelete() {
        let myObject = [];
        selectedList.forEach(item => {

            let selectedListArray = item.split(',');

            myObject.push({
                productType: selectedListArray[0],
                id: selectedListArray[1],
            });

            fetch('https://juniortestleandrosoares.dominionlps.com/API/dataHandler.php', {
                method: 'DELETE',
                headers: { 'content-Type': 'aplication/json' },
                body: JSON.stringify(myObject)
            })
                .then(response => response.json())
                .then(jsonData => setProductList(jsonData))
                .catch(error => console.log(error));
        });
    }

    function checkBoxHandle() {
        if (event.target.checked) {
            setSelectedList([...selectedList, event.target.value]);
        } else {
            let indexToRemoveFromSelected = selectedList.indexOf(event.target.value);
            let itemRemoved = selectedList.filter(elem => selectedList.indexOf(elem) != indexToRemoveFromSelected);
            setSelectedList(itemRemoved);
        }
    }

    function addProductHandler() {
        navigate('add-product');
    }

    return (
        <div className={styles.main}>
            <Header
                title={'Product List'}
                btn1Type={'button'}
                btn2Type={'button'}
                btn1Id={'add-product-btn'}
                btn2Id={'delete-product-btn'}
                btn1Title={'Add'}
                btn2Title={'Mass Delete'}
                onClickBtn1={addProductHandler}
                onClickBtn2={massDelete}
            />

            <div className={styles.listOfProducts}>
                <div className={styles.divOrderBy}>
                    <label>Order By: </label>
                    <select name='orderSelector' id='orderSelector' onChange={orderList}>
                        <option value='id'>Product table Id</option>
                        <option value='createdAt'>Time of creation</option>
                    </select>
                </div>

                {Array.isArray(productList) && productList.map(elem =>
                    <div key={elem.sku} className={styles.product}>
                        <div className={styles.checkboxContainer}>
                            <input type='checkbox'
                                className={styles.deleteCheckbox}
                                value={[elem.productType, elem.id]}
                                onChange={checkBoxHandle}
                            />
                        </div>
                        <span>ID: {elem.id}</span>
                        <span>{elem.sku}</span>
                        <span>{elem.name}</span>
                        <span>{elem.price} $</span>
                        {elem.weight && <span>weight : {elem.weight} kg</span>}
                        {elem.size && <span>Size : {elem.size}</span>}
                        {elem.height && <span>Dimensions : {elem.width} x {elem.height} x {elem.length}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}