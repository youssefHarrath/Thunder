import requests

def get_quran_verse(surah_number, ayah_number):
    url = f"https://api.alquran.cloud/v1/ayah/{surah_number}:{ayah_number}/ar.alafasy"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data['data']['text']
    else:
        return "الآية غير موجودة."

def handle_command(command):
    if command.startswith(".قران"):
        parts = command.split()
        if len(parts) == 3:
            try:
                surah_number = int(parts[1])
                ayah_number = int(parts[2])
                verse = get_quran_verse(surah_number, ayah_number)
                return verse
            except ValueError:
                return "يرجى إدخال أرقام صحيحة للسورة والآية."
        else:
            return "يرجى استخدام الصيغة الصحيحة: .قران <رقم السورة> <رقم الآية>"
    else:
        return "الأمر غير معروف."

# مثال على الاستخدام:
command = ".قران 1 1"
response = handle_command(command)
print(response)
