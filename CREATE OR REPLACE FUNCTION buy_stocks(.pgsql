CREATE OR REPLACE FUNCTION buy_stocks(
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

    -- Subtracting the amount from Cash
    UPDATE stock_cash
    SET amount = amount - total_cost
    WHERE email = value_email;

    -- Check if the amount in stock_cash is not negative
    IF (SELECT amount FROM stock_cash WHERE email = value_email) < 0 THEN
        -- Rollback the transaction
        ROLLBACK;
        -- Set transaction_success to FALSE
        transaction_success := FALSE;
    ELSE
        -- Adding the stock
        -- Check if the ticker exists in the stocks table
        IF EXISTS (
            SELECT 1 FROM stock_assets
            WHERE ticker = value_ticker AND  email = value_email
        ) THEN 
            -- Update the existing row 
            UPDATE stock_assets
            SET qt = qt + value_qt,
                total_cost_acquisition = total_cost_acquisition + total_cost
            WHERE ticker = value_ticker AND  email = value_email;
        ELSE
            -- Insert a new row
            INSERT INTO stock_assets (email, ticker, qt, total_cost_acquisition)
            VALUES (value_email, value_ticker, value_qt, total_cost);
        END IF;

        -- Set transaction_success to TRUE if no errors occurred
        transaction_success := TRUE;
    END IF;

    -- Return the transaction_success variable
    RETURN transaction_success;
END;
$$ LANGUAGE plpgsql;
