/* Logout Button */

let logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(response => {
    if (response) location.reload();
});

/* ProfileWidget */

ApiConnector.current(response => ProfileWidget.showProfile(response.data)); 

/* Rates Board */

let ratesBoard = new RatesBoard();

function getRates() {
    ApiConnector.getStocks(response => {
        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

getRates();
setInterval(getRates, 60000);

/* Money Manager */

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Вы успешно пополнили счёт");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Вы успешно сконвертировали валюту");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Вы успешно перевели средства");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

/* Favorites Widget */

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, "Вы успешно добавили пользователя");
    } else {
        favoritesWidget.setMessage(response.success, response.error);
    }
});

favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, "Вы успешно удалили пользователя");
    } else {
        favoritesWidget.setMessage(response.success, response.error);
    }
});