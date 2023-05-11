import Header from '../../Components/Header/index.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './AddProduct.module.scss';
import validateInput from '../../Services/Validators/validateInput.js';

export default function AddProduct() {
    const navigate = useNavigate();

    const [type, setType] = useState('book');
    const [backEndErrorMessage, setBackEndErrorMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState({});

    const removeMessage = (event) => {
        if (errorMessage[event.target.id]) {
            setErrorMessage('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formObject = {};

        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }

        let validation = validateInput(formObject);

        if (validation == true) {
            fetch('https://juniortestleandrosoares.dominionlps.com/API/dataHandler.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formObject)
            })
                .then(response => {
                    if (response.ok) {
                        navigate('/');
                    } else {
                        return response.text()
                            .then(message => {
                                setBackEndErrorMessage(message);
                            });
                    }
                })
                .catch(error => console.error('Error', error));
        } else {
            setErrorMessage(validation);
        }
    };
    return (
        <div className={styles.main}>
            <Header
                title={'Product Add'}
                btn1Type={'submit'}
                btn1Id={'save-product-btn'}
                btn1Title={'Save'}
                btn1Form={'product_form'}
                btn2Type={'button'}
                btn2Id={'cancel-btn'}
                btn2Title={'Cancel'}
                onClickBtn2={() => navigate('/')}
            />
            <div className={styles.formDiv}>
                <form id='product_form' className={styles.formStyle} onFocus={removeMessage} onSubmit={handleSubmit}>
                    {backEndErrorMessage &&
                        <span>{backEndErrorMessage}</span>
                    }
                    <label htmlFor='sku' >SKU  </label>
                    <input
                        type='text'
                        id='sku'
                        name='sku'
                        placeholder='ex.: DR46F5-6GF-xyz'
                        minLength='2'
                        maxLength='60'
                        required

                    />
                    {errorMessage.sku &&
                        <span>{errorMessage.sku}</span>
                    }

                    <label htmlFor='name'>Name  </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='ex.: The Lord of The Rings - The Fellowship of the Ring'
                        minLength='1'
                        maxLength='60'
                        required
                    />
                    {errorMessage.name &&
                        <span>{errorMessage.name}</span>
                    }

                    <label htmlFor='price'>Price  </label>
                    <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='ex.: 999999.99'
                        step='0.01'
                        min='1'
                        max='999999.99'
                        required

                    />
                    {errorMessage.price &&
                        <span>{errorMessage.price}</span>
                    }

                    <div className={styles.typeSwitcherDiv}>
                        <label>Type Switcher  </label>
                        <select onChange={(event) => setType(event.target.value)} name='productType' id='productType'>
                            <option value='book' id='Book'>Book</option>
                            <option value='dvd' id='DVD'>DVD</option>
                            <option value='furniture' id='Furniture'>Furniture</option>
                        </select>

                        {type == 'book' &&
                            <div className={styles.productSpecification}>
                                <label htmlFor='weight'>Weight (Kg)</label>
                                <input
                                    type='number'
                                    id='weight'
                                    name='weight'
                                    placeholder='ex.: 999999.99'
                                    step='0.01'
                                    min='1'
                                    max='999999.99'
                                    required
                                />
                                {errorMessage.weight &&
                                    <span>{errorMessage.weight}</span>
                                }
                                <p>
                                    Please provide the weight of the book in Kg (Kilograms). Only numbers and dots
                                    allowed. ex.:999999.99.
                                </p>
                            </div>
                        }

                        {type == 'dvd' &&
                            <div className={styles.productSpecification}>
                                <label htmlFor='size'>Size (MB)</label>
                                <input
                                    type='number'
                                    id='size'
                                    name='size'
                                    placeholder='ex.: 99999999999'
                                    min='1'
                                    max='99999999999'
                                    required
                                />
                                {errorMessage.size &&
                                    <span>{errorMessage.size}</span>
                                }
                                <p>
                                    Please provide the size of the dvd in MB (megabytes). Only integer numbers
                                    allowed. ex.: 4500.
                                </p>
                            </div>
                        }

                        {type == 'furniture' &&
                            <div className={styles.productSpecification}>
                                <label htmlFor='height'>Height (CM)</label>
                                <input
                                    type='number'
                                    id='height'
                                    name='height'
                                    placeholder='ex.: 99999999999'
                                    min='1'
                                    max='99999999999'
                                    required
                                />
                                {errorMessage.height &&
                                    <span>{errorMessage.height}</span>
                                }

                                <label htmlFor='width'>Width (CM)</label>
                                <input
                                    type='number'
                                    id='width'
                                    name='width'
                                    placeholder='ex.: 99999999999'
                                    min='1'
                                    max='99999999999'
                                    required
                                />
                                {errorMessage.width &&
                                    <span>{errorMessage.width}</span>
                                }

                                <label htmlFor='length'>Length (CM)</label>
                                <input
                                    type='number'
                                    id='length'
                                    name='length'
                                    placeholder='ex.: 99999999999'
                                    min='1'
                                    max='99999999999'
                                    required
                                />
                                {errorMessage.length &&
                                    <span>{errorMessage.length}</span>
                                }
                                <p>
                                    Please provide the Dimensions(HxWxL) of the furniture in CM (centimeters). Only integer numbers
                                    allowed. ex.: 200. For reference purposes: 100cm = 1m = 39,3701&quot; = 3,28084ft
                                </p>
                            </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}