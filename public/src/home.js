const common = require("mocha/lib/interfaces/common");

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function getTotalBooksCount(books) {
  return books.reduce(total => total + 1, 0);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getTotalAccountsCount(accounts) {
  return accounts.reduce(total => total + 1, 0);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getBooksBorrowedCount(books) {
  let myBorrowedFilter = books.filter(book => !book.borrows[0].returned)
  let myBorrowedMap = myBorrowedFilter.map(book => book.title);
  return myBorrowedMap.length;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getMostCommonGenres(books) {
  const mostCommon = [];
  for (let book of books) {
    if (mostCommon.length === 0 || !mostCommon.some(item => item.name === book.genre)) {
      let genreFilter = books.filter(filteredBook => filteredBook.genre === book.genre);
      let genreCount = { name: book.genre, count: genreFilter.length };
      mostCommon.push(genreCount);
    }
  }
  mostCommon.sort((genreA, genreB) => genreB.count > genreA.count ? 1 : -1);
  return mostCommon.slice(0, 5);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

function getMostPopularBooks(books) {
  const mostPopular = [];
  for (let book of books) {
    if (mostPopular.length === 0 || !mostPopular.some(popularBook => popularBook.name === book.title)) {
      let popularBook = { name: book.title, count: book.borrows.length};
      mostPopular.push(popularBook);
    }
  }
  mostPopular.sort((bookA, bookB) => bookB.count - bookA.count);
  return mostPopular.slice(0, 5);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function getMostPopularAuthors(books, authors) {
  const mostPopular = [];
  authors.forEach(author => {
    let myAuthor = { name: `${author.name.first} ${author.name.last}`, count: 0 };
    books.forEach(book => {
      if (book.authorId === author.id) {
        myAuthor.count += book.borrows.length;
      }
    })
    mostPopular.push(myAuthor);
  })
  mostPopular.sort((bookA, bookB) => bookB.count - bookA.count)
  return mostPopular.slice(0, 5);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
