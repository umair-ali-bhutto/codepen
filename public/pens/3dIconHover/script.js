function umair() {
    alert("Done with Pure CSS & a Font Awesome Icon");
    const userRating = parseInt(prompt("How many stars would you give the 3D CSS button (1-5)? 🤔🤔🤔🤔🤔🤔🤔"));

    if (!isNaN(userRating) && userRating >= 1 && userRating <= 5) {
        if (userRating >= 3) {
            alert("Thank you so much! We're glad you liked it. 🙂");
        } else {
            alert("Thank you for your feedback. We'll strive to make it even better. 😐");
        }
    } else {
        alert("Please enter a valid star rating between 1 and 5.");
    }
  }
  
