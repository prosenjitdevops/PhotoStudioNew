resource "azurerm_linux_virtual_machine" "vm" {
  name                  = "labs-jumpbox-vm"
  resource_group_name   = var.resource_group_name
  location              = var.location
  size                  = "Standard_A2_v2"
  admin_username        = "azureuser"
  network_interface_ids = [azurerm_network_interface.nic.id]
  admin_ssh_key {
    username   = var.admin_username
    public_key = file(var.ssh_public_key_path)
  }
  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
}