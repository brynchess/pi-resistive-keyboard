def convert_dict_values_to_numbers(input_dict):
    converted_dict = {}
    for key, value in input_dict.items():
        try:
            converted_value = float(value)
            if converted_value.is_integer():
                converted_dict[key] = int(converted_value)
            else:
                converted_dict[key] = converted_value
        except (ValueError, TypeError):
            converted_dict[key] = value
    return converted_dict