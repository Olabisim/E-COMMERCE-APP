
import React, {useState} from 'react';

import {View as V, Text as T, Button as B, StyleSheet as SS, ScrollView as SV, TextInput as TI} from 'react-native';
import Todo from './Todo';

const TodoList = () => {

    const [title, setTitle] = useState('TodoList')
    const [text, setText] = useState('')
    const [list, setList] = useState(['Hello World'])

    // add item method
    const addItem = () => {
        const updatedList = list;
        // updatedList.push(text)
        setList([text, ...updatedList])
        setText('')
    }

    // delete item method
    const deleteItem = (index) => {
        const updatedList = list.filter((todo) => todo !== index)
        setList(updatedList);
    }

    return (
        <V style={{ width: '80%', marginBottom: 60}}>
            
            <T style={[styles.align, styles.font, {paddingBottom: 10}]}>{title}</T>

            {/* <V>
                <TI
                style={styles.input}
                value={text}
                onChangeText={(text) => setText(text)}
                />
                <B title="Add item" onPress={addItem} />
            </V> */}


            {/* <V style={{display: 'flex', flexDirection: 'row', paddingBottom: 10, flex: 1, width: '100%'}}> */}
            

            
            {/* <V style={[styles.item, {margin: 8, padding: 8}]}>
                <TI
                    style={styles.input}
                    value={text}
                    onChangeText={(text) => setText(text)}
                /> 
                <B title='Add' onPress={() => addItem(text)} />
            </V> */}


            <V style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TI
                        style={styles.input}
                        value={text}
                        onChangeText={(text) => setText(text)}
                    />

                    <V style={{justifyContent: 'center'}}>
                        {/* <T style={{}}>end</T> */}
                        <B title='Add' onPress={() => addItem(text)} style={{
                             borderRadius:100
                        }} />
                    </V>

            </V>


            {/* <V style={{flex: 1, padding: 20}}>
                <V style={{flex: 3, backgroundColor: 'yellow'}}> 
                    <TI
                        style={styles.input}
                        value={text}
                        onChangeText={(text) => setText(text)}
                    />
                </V>
                <V style={{flex: 1, backgroundColor: 'green'}}>
                    <B title='Add' onPress={() => addItem(text)} />
                </V>
            </V> */}

            <SV>
                {list.map((x, index) => <Todo key={index} item={x} index={index} delete={deleteItem} /> )}
            </SV>
        </V>
    )
}

const styles = SS.create({
    align: {
        alignSelf: "center",
    },
    font: {
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 8,
        padding: 8,
        width: 240
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'whitesmoke'
    }
})

export default TodoList;