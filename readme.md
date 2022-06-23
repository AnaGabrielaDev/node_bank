  ![view](https://user-images.githubusercontent.com/72721343/175119795-95e7af44-3b47-46e0-adca-baf45ff85778.gif)

# Node Bank

this is a node project, created following the rocktetseat teaching platform classes. The intention was to have a contact with node and learn about express. In addition to what I learned, I also separated the files by layers on my own.

## Stack

**Back-end:** Node, Express, UUID, nodemon

## API Documentation

#### Return an object

```http
  POST /account
```

| Parameter Body | Type     | Description  |
| :------------- | :------- | :----------- |
| `name`         | `string` | **Required** |
| `cpf`          | `string` | **Required** |

#### Edit the name

```http
  PATCH /account
```

| Parameter Body | Type     | Description  |
| :------------- | :------- | :----------- |
| `name`         | `string` | **Required** |

| Parameter Header | Type     | Descrição    |
| :--------------- | :------- | :----------- |
| `cpf`            | `string` | **Required** |

#### Return all statement

```http
  GET /statement
```

| Parameter Header | Type     | Description  |
| :--------------- | :------- | :----------- |
| `cpf`            | `string` | **Required** |

#### make a deposit

```http
  POST /deposit
```

| Parameter Body | Type                    | Description  |
| :------------- | :---------------------- | :----------- |
| `amount`       | `number (int or float)` | **Required** |
| `description`  | `string`                | **Required** |

| Parameter Header | Type     | Description  |
| :--------------- | :------- | :----------- |
| `cpf`            | `string` | **Required** |

#### get money

```http
  POST /withdraw
```

| Parameter Body | Type                    | Description  |
| :------------- | :---------------------- | :----------- |
| `amount`       | `number (int or float)` | **Required** |

| Parameter Header | Type     | Description  |
| :--------------- | :------- | :----------- |
| `cpf`            | `string` | **Required** |

#### return the statement on specific date

```http
  GET /statement/date
```

| Parameter Query | Type     | Description  |
| :-------------- | :------- | :----------- |
| `date`          | `string` | **Required** |

| Parameter Header | Type     | Description  |
| :--------------- | :------- | :----------- |
| `cpf`            | `string` | **Required** |

#### return all informations about an account

```http
  GET /account
```

| Parameter Header | Type     | Description  |
| :--------------- | :------- | :----------- |
| `cpf`            | `string` | **Required** |

#### return the amount on account

```http
  GET /balance
```

| Parameter Header | Type     | Description  |
| :--------------- | :------- | :----------- |
| `cpf`            | `string` | **Required** |

#### delete an account

```http
  DELETE /account
```

| Parameter Header | Type     | Description  |
| :--------------- | :------- | :----------- |
| `cpf`            | `string` | **Required** |

## Rodando localmente

Clone the project

```bash
  https://github.com/AnaGabrielaDev/node_bank.git
```

Enter the project directory

```bash
  cd node_bank
```

start server

```bash
    yarn dev
```
