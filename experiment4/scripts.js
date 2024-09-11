class Person {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    printDetails() {
        return `Name: ${this.name}, Phone: ${this.phone}`;
    }
}

class Student extends Person {
    constructor(name, phone, rollNo) {
        super(name, phone);
        if (rollNo <= 0) {
            throw new Error('Roll number must be greater than zero');
        }
        this.rollNo = rollNo;
    }

    printDetails() {
        return `${super.printDetails()}, Roll No: ${this.rollNo}`;
    }
}

// Arrow function as a non-member function
const generateReceipt = (formData) => {
    const date = new Date();
    const receipt = `
        <h2>Order Confirmation</h2>
        <p>Your order has been received on ${date.toDateString()}.</p>
        <p>Tagline: ${formData.tagline}</p>
        <p>Color: ${formData.color}</p>
        <p>Size: ${formData.size}</p>
        <p>Quantity: ${formData.quantity}</p>
        <p>Delivery Date: ${formData.deliveryDate}</p>
        <p>Recipient: ${formData.recipientName}</p>
        <p>Address: ${formData.address}</p>
        <p>Email: ${formData.email}</p>
        <p>Phone: ${formData.phone}</p>
        <p>Comments: ${formData.comments}</p>
    `;
    return receipt;
};

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        tagline: document.getElementById('tagline').value,
        color: document.getElementById('color').value,
        size: document.getElementById('size').value,
        quantity: document.getElementById('quantity').value,
        deliveryDate: document.getElementById('delivery-date').value,
        recipientName: document.getElementById('recipient-name').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        comments: document.getElementById('comments').value
    };

    const receiptContent = generateReceipt(formData);
    document.getElementById('receipt').innerHTML = receiptContent;
    document.getElementById('receipt').style.display = 'block';

    try {
        const student = new Student(formData.recipientName, formData.phone, 1); // Example roll number
        console.log(student.printDetails());
    } catch (error) {
        alert(error.message);
    }
});
