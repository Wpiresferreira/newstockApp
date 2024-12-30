CREATE OR REPLACE FUNCTION add_cash_for_new_user()
RETURNS TRIGGER AS $$ BEGIN 
-- Insert a new row into the stock_cash table
INSERT INTO stock_cash (email, amount) VALUES (NEW.email, 100000);
-- Assuming the initial amount is 0, adjust as needed
RETURN NEW;
END;
$$ LANGUAGE plpgsql;