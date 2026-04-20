from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('/home/claude/petcaixa/icons', exist_ok=True)

def gerar_icone(tamanho):
    img = Image.new('RGBA', (tamanho, tamanho), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Fundo verde arredondado
    raio = tamanho // 5
    cor_verde = (45, 106, 79)
    cor_dourado = (212, 168, 67)

    # Fundo com cantos arredondados
    draw.rounded_rectangle([0, 0, tamanho, tamanho], radius=raio, fill=cor_verde)

    # Pata estilizada (círculos)
    cx, cy = tamanho // 2, int(tamanho * 0.55)
    r = int(tamanho * 0.14)
    gap = int(tamanho * 0.04)

    # 4 dedinhos
    offsets = [
        (-int(r*1.2), -int(r*1.3)),
        (-int(r*0.35), -int(r*1.65)),
        (int(r*0.35), -int(r*1.65)),
        (int(r*1.2), -int(r*1.3)),
    ]
    r_small = int(r * 0.62)
    for ox, oy in offsets:
        draw.ellipse([cx+ox-r_small, cy+oy-r_small, cx+ox+r_small, cy+oy+r_small], fill=cor_dourado)

    # Palma central
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=cor_dourado)

    img.save(f'/home/claude/petcaixa/icons/icon-{tamanho}.png', 'PNG')
    print(f'Ícone {tamanho}x{tamanho} gerado.')

gerar_icone(192)
gerar_icone(512)
print('Ícones criados com sucesso.')
