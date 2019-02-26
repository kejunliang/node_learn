// index:

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome'
        });
    },
    'GET /class1': async (ctx, next) => {
        ctx.render('class1.html', {
            title: 'Welcome'
        });
    }
};