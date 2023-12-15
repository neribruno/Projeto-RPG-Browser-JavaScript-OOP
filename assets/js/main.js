let log = new Log(document.querySelector('.log'));

let char = new Knight('Baranön');
let monster = new Gnoll('Gnoll');

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log,
);

stage.start();


