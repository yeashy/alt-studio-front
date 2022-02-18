# Домен локального сервера - `backend.ru`
Если хотите использовать сервер со своим доменом - следует поменять адрес в `userAPI` и `placemarkAPI`.<br><br>
Запросы на локальный сервер и ответы с него выполняются немного долго, поэтому пришлось поставить таймаут для запроса `getPlacemarks`, иначе он возвращал бы необновленные данные о метках.<br><br>
Т. к. `/node_modules` весят как нейтронная звезда, то информация про все необходимые библиотеки лежит в `package.json`.
