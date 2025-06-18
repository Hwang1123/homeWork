package z.practice.farm;

import java.util.Objects;

public class Vegetable extends Farm {
    private String name;

    public Vegetable() {
    }

    public Vegetable(String kind, String name) {
        super(kind);
        this.name = name;
    }

    @Override
    public String toString() {
        return super.toString() + " : " + name;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Vegetable vegetable = (Vegetable) o;
        return Objects.equals(name, vegetable.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
