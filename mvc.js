var model = {
    currentAvenger: null,
    data: [{
        id: '0',
        name: 'Doctor Strange',
        imgSrc: './assets/img/Doctor_Strange_MoM_Profile.webp',
        count: 0
    },
    {
        id: '1',
        name: 'Hulk',
        imgSrc: './assets/img/the-incredible-hulk-2008-1200.jpg',
        count: 0
    },
    {
        id: '2',
        name: 'Iron Man',
        imgSrc: './assets/img/scene-Iron-Man.webp',
        count: 0
    }],

    init: function () {
        this.setCurrentAvenger();
    },
    setCurrentAvenger: function (avengerId) {
        if (avengerId != null)
            this.currentAvenger = this.data.find((avenger) => {
                return avenger.id == avengerId;
            });
        else
            this.currentAvenger = this.data[0];
    },
    getCurrentAvenger: function () {
        return this.currentAvenger;
    },
    getAllAvengers: function () {
        return this.data;
    }
}

var controller = {
    getCurrentAvenger: function () {
        return model.getCurrentAvenger();
    },
    setCurrentAvenger: function (avengerId) {
        return model.setCurrentAvenger(avengerId);
    },
    modifyCurrentAvenger: function (avenger) {
        for (var prop in model.currentAvenger) {
            if (avenger[prop]) {
                model.currentAvenger[prop] = avenger[prop];
            }
        }
    },
    getAllAvengers: function () {
        return model.getAllAvengers();
    },

    incrementCounter: function () {
        model.currentAvenger.count++;
    }
}


var avengerView = {
    init: function () {
        this.avenger = controller.getCurrentAvenger();
        this.render();
    },
    render: function () {
        var avenger = controller.getCurrentAvenger();
        var view = document.getElementById('avengerView');
        view.innerHTML = "";
        var img = document.createElement('img');
        img.class = 'img-fliud';
        img.src = avenger.imgSrc;
        img.width = 400;
        img.addEventListener('click', function (e) {
            controller.incrementCounter();
            avengerView.render();
        })
        var p = document.createElement('p');
        p.textContent = avenger.name;
        var counter = document.createElement('p');
        counter.textContent = 'Click count:' + avenger.count;
        view.appendChild(img);
        view.appendChild(p);
        view.appendChild(counter);
    }
}

var avengerListView = {
    init: function () {
        this.avengerList = controller.getAllAvengers();
        this.render();
    },
    render: function () {
        var view = document.getElementById('avengerListView');
        view.innerHTML = "";
        for (let i = 0; i < this.avengerList.length; i++) {
            var li = document.createElement('li');
            var img = document.createElement('img');
            img.classList = 'img-fluid';
            img.src = this.avengerList[i].imgSrc;
            img.width = "150";
            img.addEventListener('click', () => {
                controller.setCurrentAvenger(this.avengerList[i].id);
                avengerView.render();
            })
            li.appendChild(img);
            view.appendChild(li);
        }
    }
}

var adminView = {
    init: function () {
        this.shown = 0;
        this.render();
    },
    render: function () {
        var adminDiv = document.getElementById('admin');
        adminDiv.innerHTML = "";
        if (this.shown) {
            let container = [document.createElement('div'), document.createElement('div')];
            let input = [document.createElement('input'), document.createElement('input'), document.createElement('input')];
            input[0].className = input[1].className = input[2].className = "text-center";
            input[0].placeholder = "Name"
            input[1].placeholder = "imgSrc"
            input[2].placeholder = "Number of Clicks"
            container[0].classList = "d-flex flex-column mt-2 me-3";
            container[0].append(input[0], input[1], input[2]);
            let button = [document.createElement('button'), document.createElement('button')]
            button[0].setAttribute('id', 'close');
            button[0].textContent = 'Close'
            button[0].addEventListener('click', () => {
                this.shown = 0;
                adminView.render();
            })
            button[1].setAttribute('id', 'submit');
            button[1].textContent = 'Subtmit'
            button[1].addEventListener('click', () => {
                this.shown = 0;
                controller.modifyCurrentAvenger({
                    name: input[0].value,
                    imgSrc: input[1].value,
                    count: input[2].value
                });
                adminView.render();
                avengerView.render();
            })
            container[1].classList = "d-flex justify-content-between mt-2";
            container[1].append(button[0], button[1]);
            container[0].append(container[1]);
            adminDiv.append(container[0]);
        }
        else {
            let button = document.createElement('button');
            button.textContent = 'Admin';
            button.addEventListener('click', () => {
                this.shown = 1;
                button.remove();
                adminView.render();
            })
            adminDiv.append(button);
        }

    }
}


model.init();
avengerListView.init();
adminView.init();
avengerView.init();