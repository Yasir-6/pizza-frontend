import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {connect} from "react-redux";
import CartUtils from '../../utils/CartUtils';
import {updateCartAction} from "../../actions/UpdateCartAction";
import OrderItem from "../general/OrderItem";
import Grid from "@material-ui/core/Grid";
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'calc(26%)',
        position: 'fixed',
        marginTop: '15px',
        paddingBottom: '20px',
    },
    close:{
        display: 'none',
        padding: '16px',
    }
}));

const mapStateToProps = (state) => ({
    items: state.items,
})


function Cart(props) {
    const classes = useStyles();

    const add = (i) => {
        props.dispatch(updateCartAction(CartUtils.add(i, props.items)));
    }

    const remove = (i) => {
        props.dispatch(updateCartAction(CartUtils.remove(i, props.items)));
    }

    const getTotal = () => {
        let total = 0;
        props.items.map((i) => {
            total += i.price * i.quantity;
        });

        total += getDeliveryFee();
        return total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        }) + ' / ' + (props.exchangeRate * total).toLocaleString('en-UK', {
            style: 'currency',
            currency: 'EUR',
        })
    }

    const getDeliveryFee = () => {
        return 5;
    }


    return (
        <List dense className={classes.root}>
            <IconButton onClick={props.onClose} className={classes.close}>
                <CloseIcon/>
            </IconButton>
            <Grid
                container item xs={12} spacing={2}
                direction="row"
                justify="center"
                alignItems="center"

            >
                <h2 class="font-300">Your cart items:</h2>
            </Grid>

            {props.items.length == 0 &&
            <ListItem>No item is in your cart 🧐</ListItem>
            }

            {props.items.map((i) => <OrderItem key={i.id} data={i} add={add} remove={remove}/>
            )}

            {props.items.length > 0 &&
            <>
                <ListItem>Delivery Fee: ${getDeliveryFee()}</ListItem>
                <ListItem>
                    Total: {getTotal()}
                    <ListItemSecondaryAction>
                        <Link to="/checkout">
                            <Button variant="outlined" color="secondary">Checkout</Button>
                        </Link>
                    </ListItemSecondaryAction>
                </ListItem>
            </>
            }

        </List>
    );
}

export default connect(mapStateToProps)(Cart);
