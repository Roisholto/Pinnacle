const Bank = {
  props: ['invoice'],
  template: `<div class="flex flex-column">
                    <div class="form-group">
                        <label class="has-float-label">
                            <select class="form-control">
                                <option value="001">Bank1</option>
                                <option value="002">Bank2</option>
                                <option value="003">Bank3</option>
                            </select>
                            <span>Bank</span>
                        </label>
                    </div>
                    <div class="form-group">
                        <label  class="has-float-label">
                            <input class="form-control" placeholder="0000 000 000"/>
                            <span class="">Account number</span>
                        </label>
                    </div>

                    <div class="form-group py-2">
                        <button class="w-100 btn btn-primary">Pay {{invoice.amount}}</button>
                    </div>
            </div>`
}

export default Bank
