export const getInitials = (name)=>{
    let initials = name[0];
    for (let i = 0; i < name.length; i++) {
        if(name[i] == " "){
            initials += name[i+1]
        }
    }
    return initials.toUpperCase();
}
