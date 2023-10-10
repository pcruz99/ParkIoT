def get_part_of_day(h: int) -> str:
    return (
        "MAN"  # MANANA
        if 5 <= h <= 11
        else "TAR"  # TARDE
        if 12 <= h <= 17
        else "NOC"  # NOCHE
        if 18 <= h <= 22
        else "MAD"  # MADRUGADA
    )

def pod_to_num(pod: str) -> int:
    match pod:
        case 'MAD':
            return 0
        case 'MAN':
            return 1
        case 'TAR':
            return 2
        case 'NOC':
            return 3
        case _:
            raise ValueError()
        
        
