import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10;

  // Filtered dataset
  const [filteredData, setFilteredData] = useState(data);

  // Pagination state
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));

  // --------------------------------
  // SEARCH / FILTER USING description + alt_description
  // --------------------------------
  const filterTags = (value) => {
    const term = value.toLowerCase();

    const filtered = data.filter((product) => {
      const desc = product.description
        ? product.description.toLowerCase()
        : "";
      const alt = product.alt_description
        ? product.alt_description.toLowerCase()
        : "";

      return desc.includes(term) || alt.includes(term);
    });

    setFilteredData(filtered);
    setOffset(0);
    setProducts(filtered.slice(0, limit));
  };

  // --------------------------------
  // PAGINATION FUNCTION
  // --------------------------------
  const changePage = (direction) => {
    if (direction === "next") {
      if (offset + limit < filteredData.length) {
        setOffset(offset + limit);
      }
    } else {
      if (offset - limit >= 0) {
        setOffset(offset - limit);
      }
    }
  };

  // --------------------------------
  // UPDATE PRODUCTS WHEN pagination changes
  // --------------------------------
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  const atStart = offset === 0;
  const atEnd = offset + limit >= filteredData.length;

  return (
    <div className="cf pa2">

      {/* SEARCH BAR */}
      <div className="pa3 tc">
        <Search handleSearch={filterTags} />
      </div>

      {/* PRODUCT CARDS */}
      <div className="mt2 mb2 flex flex-wrap justify-center">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} {...product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* PAGINATION BUTTONS */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => changePage("prev")}
          disabled={atStart}
        />
        <Button
          text="Next"
          handleClick={() => changePage("next")}
          disabled={atEnd}
        />
      </div>
    </div>
  );
};

export default CardList;