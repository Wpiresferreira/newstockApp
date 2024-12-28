CREATE OR REPLACE FUNCTION sell_stocks(
    value_email VARCHAR,
    value_ticker VARCHAR,
    value_qt INTEGER,
    value_unit_price DECIMAL
)
RETURNS BOOLEAN AS $$
DECLARE
    total_cost NUMERIC;
    transaction_success BOOLEAN := FALSE;
BEGIN
    total_cost := value_qt * value_unit_price;

    -- Subtracting the amount from assets
    UPDATE stock_assets
    SET qt = qt - value_qt
    WHERE email = value_email AND ticker = value_ticker;

    -- Check if the amount in stock_amount is not negative
    IF (SELECT qt FROM stock_assets WHERE email = value_email AND ticker = value_ticker) < 0 THEN
        -- Rollback the transaction
        ROLLBACK;
        -- Set transaction_success to FALSE
        transaction_success := FALSE;
    ELSE
        -- Adding the cash
            UPDATE stock_cash
            SET amount = amount + total_cost
            WHERE email = value_email;

        -- Set transaction_success to TRUE if no errors occurred
        transaction_success := TRUE;
    END IF;

    -- Return the transaction_success variable
    RETURN transaction_success;
END;
$$ LANGUAGE plpgsql;
