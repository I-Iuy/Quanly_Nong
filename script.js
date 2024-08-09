const fixedAmount = 580000;

function validateInput(id, isMoney = false, addFixedAmount = false) {
    const input = document.getElementById(id);
    let value = input.value.trim();
    value = value.replace(/\./g, '');

    if (value === '' || isNaN(value)) {
        input.classList.add('is-invalid');
        return false;
    } else {
        value = parseInt(value);

        if (isMoney) {
            if (value < 10000) {
                value *= 1000;
                alert(`Giá trị bạn vừa nhập đã được chuyển thành ${value.toLocaleString()} VND.`);
            }
        }

        if (addFixedAmount) {
            value += fixedAmount;
            alert(`Giá trị bạn vừa nhập đã + 580k. Giá trị mới: ${value.toLocaleString()} VND.`);
        }

        input.value = value;
        input.classList.remove('is-invalid');
        return true;
    }
}

function calculateMorning() {
    const isValid = validateInput('morningCups') &&
        validateInput('morningAdditionalCups') &&
        validateInput('morningSoldCups') &&
        validateInput('morningIncome', true, true) &&
        validateInput('morningTransfer', true) &&
        validateInput('morningGrab', true) &&
        validateInput('morningGojek', true) &&
        validateInput('morningOtherCosts', true);

    if (!isValid) {
        document.getElementById('morningResults').innerHTML = `<p class="text-danger">Vui lòng nhập đầy đủ và đúng thông tin.</p>`;
        return;
    }

    const morningCups = parseInt(document.getElementById('morningCups').value);
    const morningAdditionalCups = parseInt(document.getElementById('morningAdditionalCups').value);
    const morningSoldCups = parseInt(document.getElementById('morningSoldCups').value);
    const morningIncome = parseInt(document.getElementById('morningIncome').value);
    const morningTransfer = parseInt(document.getElementById('morningTransfer').value);
    const morningGrab = parseInt(document.getElementById('morningGrab').value);
    const morningGojek = parseInt(document.getElementById('morningGojek').value);
    const morningOtherCosts = parseInt(document.getElementById('morningOtherCosts').value);

    const totalMorningCups = morningCups + morningAdditionalCups;
    const remainingMorningCups = totalMorningCups - morningSoldCups;
    const totalCosts = morningTransfer + morningGrab + morningGojek + morningOtherCosts;
    const totalIncome = morningIncome - fixedAmount - totalCosts;
    const totalIncomeBeforeDeductions = morningIncome - fixedAmount;
    const totalCashInBox = morningIncome - totalCosts;

    window.morningResults = {
        remainingCups: remainingMorningCups,
        morningTransfer,
        morningGrab,
        morningGojek,
        morningOtherCosts,
        totalIncomeBeforeDeductions,
        morningAdditionalCups
    };

    document.getElementById('eveningCups').value = remainingMorningCups;
    document.getElementById('morningResults').innerHTML = `
    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th>Thông tin</th>
                <th>Giá trị</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Tổng ly ca sáng</td>
                <td>${totalMorningCups}</td>
            </tr>
            <tr>
                <td>Ly thừa lại</td>
                <td>${remainingMorningCups}</td>
            </tr>
            <tr>
                <td>Tiền trong máy</td>
                <td>${morningIncome.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Tiền tổng</td>
                <td>${fixedAmount.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Chi phí chuyển khoản</td>
                <td>${morningTransfer.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Chi phí grap</td>
                <td>${morningGrab.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Chi phí gojeck</td>
                <td>${morningGojek.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Chi phí khác</td>
                <td>${morningOtherCosts.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Tổng các chi phí phát sinh</td>
                <td>${totalCosts.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Tổng tiền thu thập được</td>
                <td>${totalIncomeBeforeDeductions.toLocaleString()} VND</td>
                <td><b>Chi tiết cách tính</b></td>
                <td>${morningIncome.toLocaleString()} - ${fixedAmount.toLocaleString()} = ${totalIncomeBeforeDeductions.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Tổng tiền mặt</td>
                <td>${totalCashInBox.toLocaleString()} VND</td>
                <td><b>Chi tiết cách tính</b></td>
                <td>${morningIncome.toLocaleString()} - ${totalCosts.toLocaleString()} = ${totalCashInBox.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Tổng kết tiền thu nhập của ca sáng</td>
                <td>${totalIncome.toLocaleString()} VND</td>
                <td><b>Chi tiết cách tính</b></td>
                <td>${morningIncome.toLocaleString()} - ${fixedAmount.toLocaleString()} - ${totalCosts.toLocaleString()} = ${totalIncome.toLocaleString()} VND</td>
            </tr>
        </tbody>
    </table>
`;
}

function calculateEvening() {
    const isValid = validateInput('eveningCups') &&
        validateInput('eveningAdditionalCups') &&
        validateInput('eveningSoldCups') &&
        validateInput('eveningIncome', true, true) &&
        validateInput('eveningTransfer', true) &&
        validateInput('eveningGrab', true) &&
        validateInput('eveningGojek', true) &&
        validateInput('eveningOtherCosts', true);

    if (!isValid) {
        document.getElementById('eveningResults').innerHTML = `<p class="text-danger">Vui lòng nhập đầy đủ và đúng thông tin.</p>`;
        return;
    }

    const eveningCups = parseInt(document.getElementById('eveningCups').value);
    const eveningAdditionalCups = parseInt(document.getElementById('eveningAdditionalCups').value);
    const eveningSoldCups = parseInt(document.getElementById('eveningSoldCups').value);
    const eveningIncome = parseInt(document.getElementById('eveningIncome').value);
    const eveningTransfer = parseInt(document.getElementById('eveningTransfer').value);
    const eveningGrab = parseInt(document.getElementById('eveningGrab').value);
    const eveningGojek = parseInt(document.getElementById('eveningGojek').value);
    const eveningOtherCosts = parseInt(document.getElementById('eveningOtherCosts').value);

    const morningResults = window.morningResults || {};
    const finalTransfer = eveningTransfer + (morningResults.morningTransfer || 0);
    const finalGrab = eveningGrab + (morningResults.morningGrab || 0);
    const finalGojek = eveningGojek + (morningResults.morningGojek || 0);
    const finalOtherCosts = eveningOtherCosts + (morningResults.morningOtherCosts || 0);

    const totalEveningCups = eveningCups + eveningAdditionalCups;
    const remainingEveningCups = totalEveningCups - eveningSoldCups;
    const totalCosts = finalTransfer + finalGrab + finalGojek + finalOtherCosts;
    const totalIncome = eveningIncome - fixedAmount - totalCosts;
    const totalIncomeBeforeDeductions = totalIncome + totalCosts;
    const totalCashInBox = eveningIncome - totalCosts;
    const totalMorningAdditionalCups = morningResults.morningAdditionalCups || 0;
    const totalAdditionalCups = totalMorningAdditionalCups + eveningAdditionalCups;

    document.getElementById('eveningResults').innerHTML = `
    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th>Thông tin</th>
                <th>Giá trị</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Tổng ly ca tối</td>
                <td>${totalEveningCups}</td>
            </tr>
            <tr>
                <td>Ly thừa lại</td>
                <td>${remainingEveningCups}</td>
            </tr>
            <tr>
                <td class="text-danger">Tổng ly thêm vào trong ngày</td>
                <td>${totalAdditionalCups}</td>
            </tr>
            <tr>
                <td>Tiền tổng</td>
                <td>${eveningIncome.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Tiền trong két</td>
                <td>${fixedAmount.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Chi phí chuyển khoản <small>đã gồm ca sáng</small></td>
                <td>${finalTransfer.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Chi phí grap <small>đã gồm ca sáng</small></td>
                <td>${finalGrab.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Chi phí gojeck <small>đã gồm ca sáng</small></td>
                <td>${finalGojek.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Chi phí khác <small>đã gồm ca sáng</small></td>
                <td>${finalOtherCosts.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td class="text-danger">Tổng các chi phí phát sinh</td>
                <td>${totalCosts.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Tổng tiền thu thập được</td>
                <td>${totalIncomeBeforeDeductions.toLocaleString()} VND</td>
                <td><b>Chi tiết cách tính</b></td>
                <td>${eveningIncome.toLocaleString()} - ${fixedAmount.toLocaleString()} = ${totalIncomeBeforeDeductions.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td class="text-danger">Tổng tiền mặt</td>
                <td>${totalCashInBox.toLocaleString()} VND</td>
                <td><b>Chi tiết cách tính</b></td>
                <td>${eveningIncome.toLocaleString()} - ${totalCosts.toLocaleString()} = ${totalCashInBox.toLocaleString()} VND</td>
            </tr>
            <tr>
                <td>Tổng kết tiền thu nhập của ca tối (Tính cho cả ngày)</td>
                <td>${totalIncome.toLocaleString()} VND</td>
                <td><b>Chi tiết cách tính</b></td>
                <td>${eveningIncome.toLocaleString()} - ${fixedAmount.toLocaleString()} - ${totalCosts.toLocaleString()} = ${totalIncome.toLocaleString()} VND</td>
            </tr>
        </tbody>
    </table>
`;

}


