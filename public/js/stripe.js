
/////////////////////////////////////////// working //////////////////////////////////////////////////////////


/* public/js/stripe.js */

document.getElementById('book-tour')?.addEventListener('click', async (e) => {
  e.preventDefault();
  e.target.textContent = 'Processing...';

  const tourId = e.target.dataset.tourId;

  try {
    // Fetch checkout session from API
    const res = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    if (res.data.status === 'success') {
      // Redirect to Stripe Checkout page
      window.location.href = res.data.session.url;
    }
  } catch (err) {
    console.error(err);
    alert('Error booking the tour. Please try again.');
  }

  e.target.textContent = 'Book tour now!';
});


/////////////////////////////////////////working ////////////////////////////////////////////////////////////

  
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

