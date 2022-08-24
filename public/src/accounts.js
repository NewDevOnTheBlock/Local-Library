//////////////////////////////////////////////////////////////////////////////////////////////////////

function findAccountById(accounts, id) {
  let myAccount = accounts.find(account => account.id === id);
  return myAccount;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function sortAccountsByLastName(accounts) {
  accounts.sort((account1, account2) => 
    account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function getTotalNumberOfBorrows({ id }, books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      if (id === books[i].borrows[j].id) {
        total++;
      }
    }
  }
  return total;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function getBooksPossessedByAccount({ id }, books, authors) {
  const myBooks = [];
  for (let book of books) {
    if (!book.borrows[0].returned && book.borrows[0].id === id) {
        for (let writer of authors) {
          if (writer.id === book.authorId) {
            book.author = writer; // perhaps use object shorthand?
            myBooks.push(book);
          }
        }
      }
  }
  return myBooks;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
