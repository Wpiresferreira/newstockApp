CREATE TRIGGER after_user_insert
AFTER INSERT ON stock_users
FOR EACH ROW
EXECUTE FUNCTION add_cash_for_new_user();
