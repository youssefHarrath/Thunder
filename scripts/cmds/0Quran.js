import requests

def get_quran_verse(surah_number, ayah_number):
    try:
        url = f"https://api.alquran.cloud/v1/ayah/{surah_number}:{ayah_number}/ar.alafasy"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data['data']['text']
    except requests.exceptions.RequestException as e:
        return f"حدث خطأ: {e}"
    except KeyError:
        return "الآية غير موجودة."

def handle_command(command):
    if command.startswith("قرآن."):
        parts = command.split()
        if len(parts) == 3:
            try:
                surah_number = int(parts[1])
                ayah_number = int(parts[2])
                return get_quran_verse(surah_number, ayah_number)
            except ValueError:
                return "يرجى إدخال أرقام صحيحة للسورة والآية."
        else:
            return "يرجى استخدام الصيغة الصحيحة: .قرآن <رقم السورة> <رقم الآية>"
    else:
        return "الأمر غير معروف."

# مثال على الاستخدام:
if __name__ == "__main__":
    command = "قرآن 1 1."
    response = handle_command(command)
    print(response)
