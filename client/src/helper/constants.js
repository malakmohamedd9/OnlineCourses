let tmp;
if(process.env.NODE_ENV === 'production'){
    console.log('NODE')
    tmp = 'https://onlinecourses.herokuapp.com/'
}else{
    tmp = 'http://localhost:5000/';
}

export const link = tmp;