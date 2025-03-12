/*Установите зависимости:
npm install express
npm install express cors*/
const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Для поддержки запросов с других доменов
const path = require('path');// Абсолютный путь к файлу
const multer = require('multer');//Модуль для загрузки файла

const app = express();
const PORT = process.env.PORT || 4000; // Используется переменная окружения или 4000 по умолчанию
app.use(express.json());
app.use(cors()); // Разрешаем CORS для всех источников

// Путь к файлу
//Koordinats
const DATA_FILE = path.join(__dirname,  '..','koordinaty', 'koordinats.json');
//Cod
const DATA_COD = path.join(__dirname,  '..','kod', 'kod.json');
//File
const UPLOAD_FOLDER = path.join(__dirname, '..','xlsx');;

// Редоктирование/чтение данных
// Чтение данных и вывод
app.get('/pointDat/:dataName/:dataJobsPlase/:id', (req, res) => {
    const {dataName ,dataJobsPlase, id} = req.params;   
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Ошибка сервера' });
      try {
          const jsonData = JSON.parse(data);
          const targetPoint = jsonData[dataName]?.[dataJobsPlase]?.[id];
          if (!targetPoint) {
              return res.status(404).json({ error: `Точка ${id} не найдена в ${dataName}/${dataJobsPlase}` });
          }
          res.json(targetPoint);
      } catch {
          res.status(500).json({ error: 'Ошибка обработки JSON' });
      }
  });
});
//Редоктирование
app.post('/editDat', (req, res) => { 
  const {dataPlace, dataName, dataJobs, id, positionX, positionY, vyckaPoint, date, coordinateSystem, positionType } = req.body;     
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      if (err) {
          return res.status(500).json({ error: 'Ошибка чтения данных' });
      } else {
          const jsonData = JSON.parse(data);
          if (jsonData[id]) {return res.status(400).json({ error: 'Элемент с таким ID уже существует' });}
          //Собираем в массив 
          if (dataName == "poligons") { 
              jsonData[dataName][dataPlace][id] = {
                  position: [Number(positionX),Number(positionY)],
                  vycka: Number(vyckaPoint),
                  date:date,
                  systemCoordinates: coordinateSystem,
                  positionType: positionType
                };
          }
          if (dataName == "Base")  {
              jsonData[dataName][dataJobs][id] = {
                  position: [Number(positionX),Number(positionY)],
                  vycka: Number(vyckaPoint),
                  date:date,
                  systemCoordinates: coordinateSystem,
                  positionType: positionType
                };
          }
          //Вносим иформацию в файл
          fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, "\t"), (err) => {
              if (err) {
                console.error('Ошибка записи JSON:', err);
                return res.status(500).json({ error: 'Ошибка записи JSON-файла' });
              }
              res.json({ success: true, message: `Данные точки ${id} добавлены.` });
          });
      }
  });
});

// Добавление данных
app.post('/addDat', (req, res) => { 
    const {dataPlace, dataName, dataJobs, id, positionX, positionY, vyckaPoint, date, coordinateSystem, positionType } = req.body;     
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка чтения данных' });
        } else {
            const jsonData = JSON.parse(data);
            if (jsonData[id]) {return res.status(400).json({ error: 'Элемент с таким ID уже существует' });}
            //Собираем в массив 
            if (dataName == "poligons") { 
                jsonData[dataName][dataPlace][id] = {
                    position: [Number(positionX),Number(positionY)],
                    vycka: Number(vyckaPoint),
                    date:date,
                    systemCoordinates: coordinateSystem,
                    positionType: positionType
                  };
            }
            if (dataName == "Base")  {
                jsonData[dataName][dataJobs][id] = {
                    position: [Number(positionX),Number(positionY)],
                    vycka: Number(vyckaPoint),
                    date:date,
                    systemCoordinates: coordinateSystem,
                    positionType: positionType
                  };
            }
            //Вносим иформацию в файл
            fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, "\t"), (err) => {
                if (err) {
                  console.error('Ошибка записи JSON:', err);
                  return res.status(500).json({ error: 'Ошибка записи JSON-файла' });
                }
                res.json({ success: true, message: `Данные точки ${id} добавлены.` });
            });
        }
    });
});

// Удаление данных
app.post('/delatDat', (req, res) => {
  const {dataPlace, dataName, dataJobs, id} = req.body;   
  //Считываем файл  
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения JSON:', err);
      return res.status(500).json({ error: 'Ошибка чтения JSON-файла' });
    }
    //Парсим файл 
    let jsonData = JSON.parse(data);// Преобразуем JSON в объект
    //Base
    if (dataJobs !== null) {
      if (!jsonData[dataName][dataJobs][id]) {
        return res.status(404).json({ error: 'Элемент не найден' });
      }
      //Удаляем элемент
      delete jsonData[dataName][dataJobs][id]; // Удаляем элемент по ID
    }
    //poligons
    if (dataPlace !== null) {
      if (!jsonData[dataName][dataPlace][id]) {
        return res.status(404).json({ error: 'Элемент не найден' });
      }
      //Удаляем элемент
      delete jsonData[dataName][dataPlace][id]; // Удаляем элемент по ID
    }
    
    //Перезаписываем файл
    fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Ошибка записи JSON:', err);
        return res.status(500).json({ error: 'Ошибка записи JSON-файла' });
      }
      res.json({ success: true, message: `Данные для ID ${id} удалены.` });
    });

  });

});

// Удаление Cod
app.post('/delatCod', (req, res) => {
  const {idCod, nameCod, nameTyp, siteLanguage} = req.body;
  //Считываем файл  
  fs.readFile(DATA_COD, 'utf8', (err, data) => {  
    if (err) {
      console.error('Ошибка чтения JSON:', err);
      return res.status(500).json({ error: 'Ошибка чтения JSON-файла' });
    }
    //Парсим файл 
    let jsonCod = JSON.parse(data);// Преобразуем JSON в объект
    
    if (!jsonCod[siteLanguage][nameTyp]) {
      return res.status(400).json({ error: 'Неверная категория' });
    }

    // Найти индекс элемента по id
    const index = jsonCod[siteLanguage][nameTyp].findIndex(item => item.id == idCod);
    if (index === -1) {
      return res.status(404).json({ error: 'Элемент не найден' });
    }

    // Удаление элемента без перезаписи всего массива
    jsonCod[siteLanguage][nameTyp].splice(index, 1);

    //Перезаписываем файл
    fs.writeFile(DATA_COD, JSON.stringify(jsonCod, null, 2), (err) => {
      if (err) {
        console.error('Ошибка записи JSON:', err);
        return res.status(500).json({ error: 'Ошибка записи JSON-файла' });
      }
      res.json({ success: true, message: `Данный код ${nameCod} удален.` });
    });
    
  });
});

// Добавление Cod
app.post('/newCod', (req, res) => {
  const {nameCod, nameTyp, siteLanguage} = req.body;
  //Считываем файл  
  fs.readFile(DATA_COD, 'utf8', (err, data) => {  
    if (err) {
      console.error('Ошибка чтения JSON:', err);
      return res.status(500).json({ error: 'Ошибка чтения JSON-файла' });
    }
    //Парсим файл 
    let jsonCod = JSON.parse(data);// Преобразуем JSON в объект
    
    if (!jsonCod[siteLanguage][nameTyp]) {
      return res.status(400).json({ error: 'Неверная категория' });
    }

    // Определяем новый ID как последний ID + 1
    const lastId = jsonCod[siteLanguage][nameTyp].length > 0 ? jsonCod[siteLanguage][nameTyp][jsonCod[siteLanguage][nameTyp].length - 1].id : 0;
    const newId = lastId + 1;

    // Добавление нового элемента
    jsonCod[siteLanguage][nameTyp].push({ id: newId, value: nameCod });

    //Перезаписываем файл
    fs.writeFile(DATA_COD, JSON.stringify(jsonCod, null, 2), (err) => {
      if (err) {
        console.error('Ошибка записи JSON:', err);
        return res.status(500).json({ error: 'Ошибка записи JSON-файла' });
      }
      res.json({ success: true, message: `Данный код ${nameCod} записан.` });
    });
  });
});

// Загрузка файла
// Настройка Multer (файл загружается в память)
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.originalname !== 'Jobs_kalendar.xlsx' || 
            file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
            return cb(new Error('Ошибка: Разрешено загружать только Jobs_kalendar.xlsx!'), false);
        }
        cb(null, true);
    }
});

// Маршрут для загрузки файла
app.post('/uploadFile', (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Ошибка: Файл не загружен!' });
        }
        const filePath = path.join(UPLOAD_FOLDER, 'Jobs_kalendar.xlsx');
        fs.writeFile(filePath, req.file.buffer, (err) => {
            if (err) {return res.status(500).json({ error: 'Ошибка сохранения файла!' });}
            res.json({ message: 'Файл успешно загружен!' });
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});