import EnumStatus from './enumStatus';

const getBadgeColor = (status) => {
    switch (status) {
        case EnumStatus.CONECTADO:
            return '#9CFFBD';
    
        case EnumStatus.DOSAGEM_PENDENTE:
            return '#FFFCB4';

        case EnumStatus.DOSANDO:
            return '#9CFFFF';

        case EnumStatus.ATUALIZANDO_DADOS:
            return '#FFFCB4';

        case EnumStatus.INATIVO:
            return '#ECECEC';
        
        default:
            return 'red';
    }
}

export default getBadgeColor;