using Microsoft.AspNetCore.Http.HttpResults;
using sistema_vega.Models;
using Microsoft.AspNetCore.Mvc;

namespace sistema_vega.Services
{
    public class QRCodeService
    {
        public string QRCodeGen(Supplier supplier)
        {
            if (supplier == null) {
                return "Fornecedor não encontrado para QRCode";
            }

            string date = supplier.CreatedAt.HasValue
                    ? supplier.CreatedAt.Value.ToString("dd/MM/yyyy")
                    : null;

            string Qrcode = supplier.QRCode
                        .Replace("%CNPJ%", supplier.CNPJ)
                        .Replace("%CEP%", supplier.CEP)
                        .Replace("%DATACADASTRO%", date);

            return Qrcode;
        }
    }
}

