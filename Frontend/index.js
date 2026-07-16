let count = 0;
function incrementCount() {
    count++;
    const countHeading = document.getElementById("count");
    countHeading.innerText = count;
}