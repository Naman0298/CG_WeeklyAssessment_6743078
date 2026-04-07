import {test, expect} from '@playwright/test';
import restfulBooker from './restfulBooker.json'

//auth token generate
let baseUrl: string = 'https://restful-booker.herokuapp.com'
let token: string;
let bookingid: number;
test("auth gen", async ({request}) => {
    let response = await request.post(`${baseUrl}/auth`, {
        data: {
            username: restfulBooker.username,
            password: restfulBooker.password
        },
        headers: {
            'content-type': "application/json"
        } 
    });

    await expect(response.status()).toBe(200);

    let resJson = await response.json();
    console.log(resJson);

    await expect(resJson).toHaveProperty("token");

    token = resJson.token;
    await expect(token).toBeTruthy();
    console.log(token);
})

//get all booking ids
test("get all booking ids", async ({request}) => {
    let response = await request.get(`${baseUrl}/booking`, {
        // data: {
        //     username: restfulBooker.username,
        //     password: restfulBooker.password
        // },
        // headers: {
        //     'content-type': "application/json"
        // } 
    });

    await expect(response.status()).toBe(200);

    let resJson = await response.json();
    console.log(resJson);

    
})

//get booking by id
test("get booking by id", async ({request}) => {
    let response = await request.get(`${baseUrl}/booking/${restfulBooker.id}`, {
        
        // params: {
        //     "id": 2
        // } <-- this wont work because its a query param ?id whereas in site its show as :id which is a path parameter
    });

    await expect(response.status()).toBe(200);

    let resJson = await response.json();
    await expect(resJson).toBeTruthy();

    await expect(resJson).toHaveProperty("firstname");
    await expect(resJson).toHaveProperty("lastname");

    console.log(resJson);

})

test("post booking", async ({request}) => {
    let response = await request.post(`${baseUrl}/booking`, {

        data: {
            firstname : restfulBooker.firstname,
            lastname : restfulBooker.lastname,
            totalprice : restfulBooker.totalprice,
            depositpaid : restfulBooker.depositpaid,
            bookingdates : {
                checkin : restfulBooker.bookingdates.checkin,
                checkout : restfulBooker.bookingdates.checkout
            },
            additionalneeds : restfulBooker.additionalneeds
        }
    });

    await expect(response.status()).toBe(200);

    let resJson = await response.json();
    console.log(resJson);

    await expect(resJson).toHaveProperty("bookingid");
    await expect(resJson).toHaveProperty("booking");

    bookingid = resJson.bookingid;
    await expect(bookingid).toBeTruthy();

    await expect(resJson.booking.firstname).toBe(restfulBooker.firstname);
    await expect(resJson.booking.lastname).toBe(restfulBooker.lastname);
});

test("update booking", async ({request}) => {
    let response = await request.put(`${baseUrl}/booking/${bookingid}`, {

        data: {
            firstname : restfulBooker.updateDetails.firstname,
            lastname : restfulBooker.updateDetails.lastname,
            totalprice : restfulBooker.updateDetails.totalprice,
            depositpaid : restfulBooker.updateDetails.depositpaid,
            bookingdates : {
                checkin : restfulBooker.updateDetails.bookingdates.checkin,
                checkout : restfulBooker.updateDetails.bookingdates.checkout
            },
            additionalneeds : restfulBooker.updateDetails.additionalneeds
        },
        headers: {
            'content-type' : "application/json",
            'cookie': `token=${token}`
        }
    });

    await expect(response.status()).toBe(200);

    let resJson = await response.json();
    console.log(resJson);

    await expect(resJson.firstname).toBe(restfulBooker.updateDetails.firstname);
    await expect(resJson.lastname).toBe(restfulBooker.updateDetails.lastname);
    await expect(resJson.totalprice).toBe(restfulBooker.updateDetails.totalprice);
    await expect(resJson.depositpaid).toBe(restfulBooker.updateDetails.depositpaid);
});

test("update bookings partial", async ({request}) => {
    let response = await request.patch(`${baseUrl}/booking/${bookingid}`, {

        data: {
            firstname : restfulBooker.partialUpdates.firstname,
            lastname: restfulBooker.partialUpdates.lastname
        },
        headers: {
            'content-type' : "application/json",
            'cookie': `token=${token}`
        }
    });

    await expect(response.status()).toBe(200);

    let resJson = await response.json();
    console.log(resJson);

    await expect(resJson.firstname).toBe(restfulBooker.partialUpdates.firstname);
    await expect(resJson.lastname).toBe(restfulBooker.partialUpdates.lastname);
});

test("delete by id", async({request}) => {
        let response = await request.delete(`${baseUrl}/booking/${bookingid}`, {
            headers:{
                'content-type' : "application/json",
                'cookie': `token=${token}`
            }
    });
    let resJson = await response.text();
    await expect(response.status()).toBe(201);
    console.log(`Response: ${resJson}`);

})