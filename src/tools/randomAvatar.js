function randomAvatar(){
    const randomNum = Math.floor(Math.random() * 5) + 1;;
    console.log(randomNum);
    return `https://daisyui.com/tailwind-css-component-profile-${randomNum}@56w.png`;    
}
export default randomAvatar;