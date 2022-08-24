const { findAccountById } = require("./accounts");

///////////////////////////////////////////////////////////////////////////////////////////////

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

///////////////////////////////////////////////////////////////////////////////////////////////

function partitionBooksByBorrowedStatus(books) {
  const myBorrowedBooks = books.filter(book => !book.borrows[0].returned);
  const myReturnedBooks = books.filter(book => book.borrows[0].returned);
  const filteredBooks = [[...myBorrowedBooks],[...myReturnedBooks]];
  return filteredBooks;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getBorrowersForBook({ borrows }, accounts) {
  let myBorrowers = [];
    for (let status of borrows) {
    let myId = status.id;
    let myAccount = findAccountById(accounts, myId);
    myAccount.returned = status.returned;
    myBorrowers.push(myAccount);
  }
  return myBorrowers.slice(0, 10);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
