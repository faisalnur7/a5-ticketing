const ticket_price = 550;
let seat = document.querySelectorAll('.seat').length;
document.querySelector('#seat_count').innerHTML = seat;

let discount_15_applied = false;
let discount_20_applied = false;

document.querySelector('#discount').addEventListener('click',function(){
    let coupon_value= document.querySelector('#discount_input').value;
    let coupon_15 = 'NEW15';
    let coupon_20 = 'Couple 20';

    let selected_tickets =  document.querySelectorAll('.seat.selected').length;
    if(coupon_value){
        if(coupon_value === coupon_15){
            discount_15_applied = true;
            document.querySelector('#grand_total').innerHTML = (selected_tickets*ticket_price*0.85).toFixed(1);
            document.querySelector('#discount_amount').innerHTML = (selected_tickets*ticket_price*0.15).toFixed(1);
            document.querySelector('#discount_div').classList.remove('hidden');
            document.querySelector('#discount_div').classList.add('flex');
            document.querySelector('#discount_input_div').classList.add('hidden');
        }else if(coupon_value === coupon_20){
            discount_20_applied = true;
            document.querySelector('#grand_total').innerHTML = (selected_tickets*ticket_price*0.8).toFixed(1);
            document.querySelector('#discount_amount').innerHTML = (selected_tickets*ticket_price*0.2).toFixed(1);
            document.querySelector('#discount_div').classList.remove('hidden');
            document.querySelector('#discount_div').classList.add('flex');
            document.querySelector('#discount_input_div').classList.add('hidden');
        }else{
            alert('Invalid Coupon Code.')
        }
    }else{
        alert('Please enter a coupon code.')
    }
})

document.querySelectorAll('.seat').forEach(function(item, index){
    item.addEventListener('click',function(){

        if(!item.classList.contains('selected')){
            if(document.querySelectorAll('.seat.selected').length >=4){
                alert('You can\'t select more than 4 tickets');
            }else{
                item.classList.add('selected');
                item.classList.remove('bg-custom_grey');
                item.classList.add('bg-custom_green');
                item.classList.remove('text-black_russian');
                item.classList.add('text-white');

                let tr = `
                            <tr class="border-none ${item.getAttribute('data-id')}" data-seat_id=${item.getAttribute('data-id')}>
                                <td class="px-0">${item.innerHTML}</td>
                                <td class="px-0 text-center">Economy</td>
                                <td class="px-0 text-right">550</td>
                            </tr>
                `;

                document.querySelector('#ticket_details').insertAdjacentHTML('beforeend', tr);
            }
        }else{
            item.classList.remove('selected');
            item.classList.add('bg-custom_grey');
            item.classList.remove('bg-custom_green');
            item.classList.remove('text-white');
            item.classList.add('text-black_russian');

            if(document.querySelector(`#ticket_details tr.${item.getAttribute('data-id')}`)){
                document.querySelector(`#ticket_details tr.${item.getAttribute('data-id')}`).remove();
            }

        }

        let selected_tickets =  document.querySelectorAll('.seat.selected').length;
        let discount_rate = 1;
        document.querySelector('#seat_count').innerHTML = seat  - selected_tickets;
        document.querySelector('#selected_seat').innerHTML = selected_tickets;
        if(discount_15_applied){
            discount_rate = 1 - 0.15;
        }else if(discount_20_applied){
            discount_rate = 1 - 0.2;
        }else{
            discount_rate = 1;
        }
        document.querySelector('#sub-total').innerHTML = (selected_tickets*ticket_price).toFixed(1);
        document.querySelector('#grand_total').innerHTML = (selected_tickets*ticket_price*discount_rate).toFixed(1);
        document.querySelector('#discount_amount').innerHTML = (selected_tickets*ticket_price*(1 - discount_rate)).toFixed(1);
    })
})

document.querySelector('.navigation_link').addEventListener('click',function(){
    document.querySelector('.buy_ticket').scrollIntoView({
        behavior: 'smooth'
    });
})